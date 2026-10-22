#!/usr/bin/env python3
"""Semantic validator for Kestrel PageSpec instances: everything JSON Schema cannot express.

Usage:  python3 schema/semantic_validate.py page.json [more.json ...]
Exit 0 when no error-severity findings. Warnings never fail the run.

Layers, in order:
  1. Draft-07 schema (schema/pagespec.schema.json). If it fails, later layers are skipped.
  2. Template cross-reference: the PageSpec's declared template's REAL node list (templates/templates.json),
     matched on (section, variant): membership, order, required, repeatable; route membership.
  3. Graph rules from compatibility/graph.json (every rule id is implemented here; extraction/verify_all.py
     asserts the two sets are identical) - severity comes from the graph file.
  4. Per-instance maxWords budgets read from the section contracts.
Findings are (severity, rule, message) tuples.
"""
import fnmatch
import glob
import json
import os
import re
import sys

import jsonschema

DR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

IMPLEMENTED_RULES = {
    "TEMPLATE_NODES", "TEMPLATE_ORDER", "ROUTE", "CHROME_FIRST", "FOOTER_POSITION", "TEASER_MATCHES_ROUTE", "ONE_HERO", "HERO_AFTER_CHROME",
    "ONE_PER_PAGE", "MAX_PER_PAGE", "NO_ADJACENT_SAME_SECTION", "HOME_ROUTE_ONLY", "MUST_FOLLOW", "ROUTE_VARIANT", "ROUTE_NODE_RULES", "VARIANT_RULES",
    "FORMS_LOCAL_ONLY", "NO_EXTERNAL_URLS", "INLINE_HTML_SUBSET", "LINK_TARGETS", "MAX_WORDS", "MOTION_FALLBACK", "ASSET_ROLE_POLICY", "UNIQUE_IDS",
}
ADJACENT_OK = set()  # named exceptions for NO_ADJACENT_SAME_SECTION (none needed by a real template)
LEAD_CHROME = {"site": ("chrome.nav",), "standalone-own-chrome": ("chrome.jobs-header", "navigation.doc-sidebar"), "standalone-bare": ("form.demo-signup",)}
ALLOWED_TAGS = {"a", "strong", "em", "br"}
URL_RX = re.compile(r"https?://", re.I)
TAG_RX = re.compile(r"<\s*(/?)\s*([a-zA-Z0-9]+)([^>]*)>")


def _load(rel):
    with open(os.path.join(DR, rel), encoding="utf-8") as f:
        return json.load(f)


def load_repo():
    secs = {}
    for f in sorted(glob.glob(os.path.join(DR, "sections", "*.json"))):
        with open(f, encoding="utf-8") as fh:
            d = json.load(fh)
        secs[d["id"]] = d
    tpls = _load("templates/templates.json")
    return {
        "schema": _load("schema/pagespec.schema.json"),
        "templates": tpls["templates"], "routing": tpls["routing"],
        "graph": _load("compatibility/graph.json"),
        "roles": _load("assets/asset-roles.json"),
        "profiles": _load("tokens/10-semantic/motion.json")["profiles"],
        "sections": secs,
        "allRoutes": {r for t in tpls["templates"].values() for r in t["routes"] if r != "*"},
    }


def words(s):
    return len(re.findall(r"\S+", re.sub(r"<[^>]+>", " ", s)))


def walk(x, fn, path=""):
    fn(x, path)
    if isinstance(x, dict):
        for k, v in x.items():
            walk(v, fn, f"{path}.{k}")
    elif isinstance(x, list):
        for i, v in enumerate(x):
            walk(v, fn, f"{path}[{i}]")


def route_matches(route, pattern):
    return fnmatch.fnmatchcase(route, pattern)


# ------------------------------------------------------------------ layer 2: template cross-reference
def check_template(doc, repo, add):
    tpl = repo["templates"].get(doc.get("template"))
    if tpl is None:
        add("TEMPLATE_NODES", f"unknown template {doc.get('template')!r}")
        return None
    route = doc.get("route")
    if tpl["routes"] == ["*"]:
        if route in repo["allRoutes"]:
            add("ROUTE", f"{tpl['id']} serves unknown paths only, but {route!r} is a real route")
    elif route not in tpl["routes"]:
        add("ROUTE", f"route {route!r} is not served by {tpl['id']} (routes: {tpl['routes'][:4]}{'...' if len(tpl['routes']) > 4 else ''})")
    tnodes = tpl["nodes"]
    used = [0] * len(tnodes)
    ptr = 0
    for j, nd in enumerate(doc.get("nodes", [])):
        typ, var = nd.get("type"), nd.get("variant")
        match = None
        for k in range(ptr, len(tnodes)):
            t = tnodes[k]
            if t["section"] == typ and var in t["variants"] and (used[k] == 0 or t["repeatable"]):
                match = k
                break
        if match is None:
            same = [k for k, t in enumerate(tnodes) if t["section"] == typ]
            if not same:
                add("TEMPLATE_NODES", f"nodes[{j}] {typ} is not in {tpl['id']}'s node list")
            elif not any(var in tnodes[k]["variants"] for k in same):
                add("TEMPLATE_NODES", f"nodes[{j}] ({typ}, {var}) variant not allowed in {tpl['id']} (allowed {sorted({v for k in same for v in tnodes[k]['variants']})})")
            elif all(used[k] and not tnodes[k]["repeatable"] for k in same if var in tnodes[k]["variants"]):
                add("TEMPLATE_NODES", f"nodes[{j}] ({typ}, {var}) appears more often than {tpl['id']} allows")
            else:
                add("TEMPLATE_ORDER", f"nodes[{j}] ({typ}, {var}) is out of order for {tpl['id']}")
            continue
        used[match] += 1
        ptr = match if tnodes[match]["repeatable"] else match + 1
    for k, t in enumerate(tnodes):
        if t["required"] and used[k] == 0:
            add("TEMPLATE_NODES", f"required node ({t['section']}, {t['variants']}) missing for {tpl['id']}")
    return tpl


# ------------------------------------------------------------------ layer 3: graph rules
def check_graph(doc, repo, tpl, add):
    nodes = doc.get("nodes", [])
    types = [n.get("type") for n in nodes]
    pairs = [(n.get("type"), n.get("variant")) for n in nodes]
    route = doc.get("route", "")
    tid = doc.get("template")
    routing = repo["routing"]
    layout = (tpl or {}).get("layout", "site")

    lead = LEAD_CHROME.get(layout, ())
    if not types or types[0] not in lead:
        add("CHROME_FIRST", f"{layout} pages must start with one of {lead}, got {types[:1]}")
    if layout == "site":
        if "chrome.footer" not in types:
            add("FOOTER_POSITION", "site-layout page has no chrome.footer")
        else:
            tail = types[types.index("chrome.footer") + 1:]
            if any(t != "chrome.video-teaser" for t in tail) or types.count("chrome.footer") != 1:
                add("FOOTER_POSITION", f"chrome.footer must be last (optionally followed by chrome.video-teaser); after it: {tail}")
        excluded = any(route_matches(route, p) for p in routing["noTeaserPatterns"])
        has = "chrome.video-teaser" in types
        if excluded and has:
            add("TEASER_MATCHES_ROUTE", f"{route} matches routing.noTeaserPatterns but carries chrome.video-teaser")
        if not excluded and not has and tid != "template.article-detail":
            add("TEASER_MATCHES_ROUTE", f"{route} must carry chrome.video-teaser")
        if tid == "template.article-detail" and has:
            add("TEASER_MATCHES_ROUTE", "guides replace the teaser with cta.article-chip")
    elif "chrome.video-teaser" in types or "chrome.nav" in types or "chrome.footer" in types:
        add("TEASER_MATCHES_ROUTE", f"{layout} pages carry no global chrome")

    heroes = [i for i, t in enumerate(types) if t and t.startswith("hero.")]
    if tid in routing["heroLessTemplates"]:
        if heroes:
            add("ONE_HERO", f"{tid} is a named hero-less template but has {len(heroes)} hero node(s)")
    elif len(heroes) != 1:
        add("ONE_HERO", f"exactly one hero.* node required, found {len(heroes)}")
    if heroes and heroes[0] != 1:
        add("HERO_AFTER_CHROME", f"the hero must directly follow the leading chrome node (index 1), found at {heroes[0]}")

    for t in sorted({x for x in types if x}):
        sec = repo["sections"].get(t)
        if not sec:
            continue
        c = types.count(t)
        cons = sec["constraints"]
        if cons.get("onePerPage") and c > 1:
            add("ONE_PER_PAGE", f"{t} appears {c} times (onePerPage)")
        if "maxPerPage" in cons:
            if c > cons["maxPerPage"]:
                add("MAX_PER_PAGE", f"{t} appears {c} times (max {cons['maxPerPage']})")
            vs = [v for s, v in pairs if s == t]
            if len(vs) != len(set(vs)):
                add("MAX_PER_PAGE", f"{t} repeats with the same variant {vs}; repeats must differ by variant")
        if cons.get("homeRouteOnly") and route != "/":
            add("HOME_ROUTE_ONLY", f"{t} is homepage-only but route is {route}")
        if cons.get("mustFollow"):
            for i, x in enumerate(types):
                if x == t and (i == 0 or types[i - 1] != cons["mustFollow"]):
                    add("MUST_FOLLOW", f"{t} must directly follow {cons['mustFollow']}")
    for a, b in zip(types, types[1:]):
        if a == b and a not in ADJACENT_OK:
            add("NO_ADJACENT_SAME_SECTION", f"{a} appears twice in a row")

    if tpl:
        for sid, m in tpl.get("routeVariants", {}).items():
            want = m.get(route)
            for s, v in pairs:
                if s == sid and want and v != want:
                    add("ROUTE_VARIANT", f"{sid} on {route} must use variant {want!r}, got {v!r}")
        for sid, rts in tpl.get("routeNodeRules", {}).items():
            present = sid in types
            if present and route not in rts:
                add("ROUTE_NODE_RULES", f"{sid} is only rendered on {rts}, not {route}")
            if not present and route in rts:
                add("ROUTE_NODE_RULES", f"{sid} is rendered on {route} and must be present")

    ids = [n.get("id") for n in nodes]
    if len(ids) != len(set(ids)):
        add("UNIQUE_IDS", f"duplicate node ids: {sorted({i for i in ids if ids.count(i) > 1})}")

    settable = {r for r, v in repo["roles"]["roles"].items() if v["pageSpecSettable"]}
    for r, pol in repo["roles"]["pinnedPolicies"].items():
        if repo["roles"]["roles"].get(r, {}).get("generationPolicy") != pol:
            add("ASSET_ROLE_POLICY", f"asset role {r} must be pinned to {pol!r}")

    for j, nd in enumerate(nodes):
        sec = repo["sections"].get(nd.get("type"))
        content = nd.get("content", {})
        prof = (nd.get("motion") or {}).get("profile")
        if sec and prof not in sec["motion"]["allowedProfiles"]:
            add("MOTION_FALLBACK", f"nodes[{j}] profile {prof!r} not allowed for {nd.get('type')}")
        p = repo["profiles"].get(prof)
        if not p or (nd.get("motion") or {}).get("reducedMotionFallback") != p["reducedMotionFallback"]:
            add("MOTION_FALLBACK", f"nodes[{j}] reducedMotionFallback must be {p['reducedMotionFallback'] if p else '?'!r}")
        if sec:
            rules = sec.get("variantRules", {}).get(nd.get("variant"), {})
            for f in rules.get("requires", []):
                if f not in content:
                    add("VARIANT_RULES", f"nodes[{j}] {nd['type']}/{nd['variant']} requires content.{f}")
            for f in rules.get("forbids", []):
                if f in content:
                    add("VARIANT_RULES", f"nodes[{j}] {nd['type']}/{nd['variant']} forbids content.{f}")
            acts = content.get("actions", [])
            if "maxActions" in rules and len(acts) > rules["maxActions"]:
                add("VARIANT_RULES", f"nodes[{j}] {nd['variant']} allows at most {rules['maxActions']} action(s)")
            if "minActions" in rules and len(acts) < rules["minActions"]:
                add("VARIANT_RULES", f"nodes[{j}] {nd['variant']} needs {rules['minActions']} actions")
            for lst, fields in rules.get("itemRequires", {}).items():
                for i, it in enumerate(content.get(lst, [])):
                    for f in fields:
                        if f not in it:
                            add("VARIANT_RULES", f"nodes[{j}] {lst}[{i}] requires {f} in variant {nd['variant']}")
            for lst, fields in rules.get("itemForbids", {}).items():
                for i, it in enumerate(content.get(lst, [])):
                    for f in fields:
                        if f in it:
                            add("VARIANT_RULES", f"nodes[{j}] {lst}[{i}] forbids {f} in variant {nd['variant']}")
            bad = set(rules.get("forbidsBlockTypes", []))
            for b in content.get("blocks", []):
                if isinstance(b, dict) and b.get("type") in bad:
                    add("VARIANT_RULES", f"nodes[{j}] block type {b['type']} not allowed in variant {nd['variant']}")

        def visit(x, path, j=j):
            if isinstance(x, dict):
                if "submission" in x and x["submission"] != "local-success-state":
                    add("FORMS_LOCAL_ONLY", f"nodes[{j}]{path}.submission must be 'local-success-state'")
                if "assetRole" in x and x["assetRole"] not in settable:
                    add("ASSET_ROLE_POLICY", f"nodes[{j}]{path} assetRole {x['assetRole']!r} is not a PageSpec-settable role")
                for k in ("href", "trailingHref"):
                    h = x.get(k)
                    if isinstance(h, str) and h.startswith("/"):
                        check_link(h, f"nodes[{j}]{path}.{k}")
            elif isinstance(x, str):
                if URL_RX.search(x):
                    add("NO_EXTERNAL_URLS", f"nodes[{j}]{path} contains an external URL")
                for m in TAG_RX.finditer(x):
                    tag = m.group(2).lower()
                    if tag not in ALLOWED_TAGS:
                        add("INLINE_HTML_SUBSET", f"nodes[{j}]{path} uses <{tag}>")
                    elif tag == "a" and not m.group(1):
                        hm = re.search(r'href\s*=\s*"([^"]*)"', m.group(3))
                        if not hm or not (hm.group(1).startswith("/") or hm.group(1).startswith("#")):
                            add("INLINE_HTML_SUBSET", f"nodes[{j}]{path} link must have an internal href")
                        elif hm.group(1).startswith("/"):
                            check_link(hm.group(1), f"nodes[{j}]{path}")

        def check_link(h, where):
            p = h.split("#")[0].split("?")[0].rstrip("/") or "/"
            if p in repo["allRoutes"] or any(route_matches(p, x["route"]) for x in routing["nonPageRoutes"]):
                return
            if any(route_matches(p, x["pattern"]) for x in routing["intentional404"]):
                return
            add("LINK_TARGETS", f"{where} -> {h} does not resolve to a known route")

        walk(content, visit)


# ------------------------------------------------------------------ layer 4: maxWords
def check_words(doc, repo, add):
    def rec(val, schema, path):
        if not isinstance(schema, dict):
            return
        if isinstance(val, str) and "maxWords" in schema and words(val) > schema["maxWords"]:
            add("MAX_WORDS", f"{path}: {words(val)} words > maxWords {schema['maxWords']}")
        if isinstance(val, dict):
            for k, v in val.items():
                if k in schema.get("properties", {}):
                    rec(v, schema["properties"][k], f"{path}.{k}")
        if isinstance(val, list) and "items" in schema:
            for i, v in enumerate(val):
                rec(v, schema["items"], f"{path}[{i}]")
        for alt in schema.get("oneOf", []):
            if isinstance(val, dict) and all(k in alt.get("properties", {}) for k in val) and all(
                    alt["properties"][k].get("const", val[k]) == val[k] for k in val if isinstance(alt["properties"].get(k), dict)):
                rec(val, alt, path)
                break
    t = doc.get("head", {}).get("title", "")
    hb = repo["schema"]["definitions"]["head"]["properties"]["title"]["maxWords"]
    if words(t) > hb:
        add("MAX_WORDS", f"head.title: {words(t)} words > {hb}")
    for j, nd in enumerate(doc.get("nodes", [])):
        sec = repo["sections"].get(nd.get("type"))
        if sec:
            rec(nd.get("content", {}), sec["contentModel"], f"nodes[{j}].content")


def validate(doc, repo=None):
    repo = repo or load_repo()
    out = []
    sev = {r["id"]: r["severity"] for r in repo["graph"]["rules"]}

    def add(rule, msg):
        out.append((sev.get(rule, "error"), rule, msg))

    errs = sorted(jsonschema.Draft7Validator(repo["schema"]).iter_errors(doc), key=lambda e: list(e.path))
    if errs:
        for e in errs[:20]:
            out.append(("error", "SCHEMA", f"{'/'.join(str(p) for p in e.path) or '<root>'}: {e.message[:200]}"))
        return out
    tpl = check_template(doc, repo, add)
    check_graph(doc, repo, tpl, add)
    check_words(doc, repo, add)
    return out


def main(paths):
    repo = load_repo()
    bad = 0
    for p in paths:
        with open(p, encoding="utf-8") as f:
            doc = json.load(f)
        res = validate(doc, repo)
        errs = [r for r in res if r[0] == "error"]
        warns = [r for r in res if r[0] == "warn"]
        print(f"{os.path.basename(p)}: {len(errs)} error(s), {len(warns)} warning(s)")
        for r in res:
            print(f"  [{r[0]}] {r[1]}: {r[2]}")
        bad += bool(errs)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:] or [os.path.join(DR, "schema", "example.pagespec.json")]))
