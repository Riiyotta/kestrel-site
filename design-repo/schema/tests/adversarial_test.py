#!/usr/bin/env python3
"""Adversarial suite: every rule must reject a mutated instance; every control must pass.

Controls: the bundled example + one synthesized minimal PageSpec per template (built generically from each
template's own node list and each section's own content model, so a new template is covered automatically).
Mutations: schema layer, template cross-reference, structural graph rules, runtime maxWords, asset-role policy.
Run: python3 schema/tests/adversarial_test.py   (exit 0 = all mutations rejected, all controls clean)
"""
import copy
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DR = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(DR, "schema"))
import semantic_validate as sv  # noqa: E402

REPO = sv.load_repo()
PAT = {
    "^(/[A-Za-z0-9._~/?#=&%-]*|#[A-Za-z0-9_-]*)$": "/pricing",
    "^[0-9.,%x+~-]+$": "40%", "^[0-9.,%x+~]+$": "40%", "^(\\$[0-9,]+|Custom)$": "$100", "^[0-9]+[hdwmy]$": "1w",
    "^[A-Z]$": "A", "^[a-z0-9-]+$": "sample", "^[a-z_]+$": "email",
}


def synth(schema):
    if "const" in schema:
        return schema["const"]
    if "enum" in schema:
        return schema["enum"][0]
    if "oneOf" in schema:
        return synth(schema["oneOf"][0])
    typ = schema.get("type")
    if isinstance(typ, list):
        typ = typ[0]
    if typ == "object":
        return {k: synth(schema["properties"][k]) for k in schema.get("required", [])}
    if typ == "array":
        return [synth(schema["items"]) for _ in range(max(schema.get("minItems", 0), 1 if schema.get("maxItems", 1) else 0))][: schema.get("maxItems", 99)]
    if typ == "string":
        if "pattern" in schema:
            return PAT[schema["pattern"]]
        return "Kestrel"
    if typ == "integer":
        return schema.get("minimum", 1)
    if typ == "boolean":
        return True
    return None


def synth_node(sid, variant, i):
    sec = REPO["sections"][sid]
    cm = sec["contentModel"]
    content = synth(cm)
    rules = sec.get("variantRules", {}).get(variant, {})
    for f in rules.get("requires", []):
        content[f] = synth(cm["properties"][f])
    for f in rules.get("forbids", []):
        content.pop(f, None)
    if rules.get("minActions"):
        content["actions"] = [synth(cm["properties"]["actions"]["items"])] * rules["minActions"]
    for lst, fields in rules.get("itemRequires", {}).items():
        for it in content.get(lst, []):
            for f in fields:
                it[f] = synth(cm["properties"][lst]["items"]["properties"][f])
    if sid == "content.rich-text":
        content["blocks"] = [{"type": "p", "html": "Kestrel sample copy"}]
    prof = sec["motion"]["allowedProfiles"][0]
    return {"id": f"n{i}", "type": sid, "variant": variant, "content": content, "motion": {"profile": prof, "reducedMotionFallback": REPO["profiles"][prof]["reducedMotionFallback"]}}


def synth_page(tid):
    t = REPO["templates"][tid]
    route = t["routes"][0] if t["routes"] != ["*"] else "/no-such-page"
    nodes = []
    for nd in t["nodes"]:
        sid = nd["section"]
        rules = t.get("routeNodeRules", {})
        if not nd["required"] and (sid not in rules or route not in rules[sid]):
            continue
        var = t.get("routeVariants", {}).get(sid, {}).get(route, nd["variants"][0])
        nodes.append(synth_node(sid, var, len(nodes)))
    return {"id": "page.synth", "route": route, "template": tid, "theme": "light", "head": {"title": "Kestrel sample page"}, "nodes": nodes}


def errors(doc):
    return [r for r in sv.validate(doc, REPO) if r[0] == "error"]


with open(os.path.join(DR, "schema", "example.pagespec.json"), encoding="utf-8") as f:
    EX = json.load(f)


def idx(doc, typ, var=None):
    return next(i for i, n in enumerate(doc["nodes"]) if n["type"] == typ and (var is None or n["variant"] == var))


def mut(fn, base=None):
    d = copy.deepcopy(base or EX)
    fn(d)
    return d


HOME = synth_page("template.home")
ABOUT = synth_page("template.company-about")

MUTATIONS = [
    # schema layer
    ("SCHEMA", "invented section type alias", lambda d: d["nodes"][1].__setitem__("type", "hero.article")),
    ("SCHEMA", "wrong template enum value", lambda d: d.__setitem__("template", "template.article")),
    ("SCHEMA", "missing reducedMotionFallback", lambda d: d["nodes"][1]["motion"].pop("reducedMotionFallback")),
    ("SCHEMA", "fallback not the profile's const", lambda d: d["nodes"][4]["motion"].__setitem__("reducedMotionFallback", "none")),
    ("SCHEMA", "invented motion field", lambda d: d["nodes"][1]["motion"].__setitem__("inventedAnimation", "spin")),
    ("SCHEMA", "invented content field", lambda d: d["nodes"][1]["content"].__setitem__("subtitle", "extra")),
    ("SCHEMA", "missing required content field", lambda d: d["nodes"][1]["content"].pop("description")),
    ("SCHEMA", "variant not in section's set", lambda d: d["nodes"][3].__setitem__("variant", "legal")),
    ("SCHEMA", "invented assetRole", lambda d: d["nodes"][1]["content"]["author"]["avatar"].__setitem__("assetRole", "photo.real-customer")),
    ("SCHEMA", "photo not in the licensed stock set", lambda d: d["nodes"][1]["content"]["author"]["avatar"].__setitem__("src", "/assets/photos/ceo-headshot.webp")),
    ("SCHEMA", "external href", lambda d: d["nodes"][8]["content"].__setitem__("href", "https://example.com/demo")),
    ("SCHEMA", "motion profile not allowed for the section", lambda d: d["nodes"][1]["motion"].update({"profile": "marquee", "reducedMotionFallback": "static-rest-frame"})),
    ("SCHEMA", "page-level style override field", lambda d: d.__setitem__("tokens", {"color.text.primary": "#FF0000"})),
    # template cross-reference (declared template vs its real node list)
    ("TEMPLATE_NODES", "node valid in schema but not in the declared template", lambda d: d["nodes"].insert(4, sv_node("content.legal-document", "standard"))),
    ("TEMPLATE_NODES", "declared template swapped to one whose node list differs", lambda d: d.update({"template": "template.blog-post", "route": "/blog/kestrel-opens-london-office"})),
    ("TEMPLATE_NODES", "required template node removed", lambda d: d["nodes"].pop(idx(d, "content.rich-text"))),
    ("TEMPLATE_NODES", "variant valid for the section but not for this template", lambda d: d["nodes"][2].__setitem__("variant", "hover")),
    ("TEMPLATE_ORDER", "fixed-position nodes reordered", lambda d: d["nodes"].insert(2, d["nodes"].pop(idx(d, "content.keep-reading")))),
    ("ROUTE", "route not served by the template", lambda d: d.__setitem__("route", "/articles/not-a-guide")),
    # structural graph rules
    ("ONE_PER_PAGE", "duplicate one-per-page section", lambda d: d["nodes"].insert(4, copy.deepcopy(d["nodes"][3]) | {"id": "body-2"})),
    ("UNIQUE_IDS", "duplicate node id", lambda d: d["nodes"][2].__setitem__("id", "header")),
    ("CHROME_FIRST", "nav not first", lambda d: d["nodes"].insert(0, d["nodes"].pop(1))),
    ("FOOTER_POSITION", "footer not last", lambda d: d["nodes"].insert(5, d["nodes"].pop())),
    ("TEASER_MATCHES_ROUTE", "teaser added on a no-teaser route", lambda d: d["nodes"].append(sv_node("chrome.video-teaser", "standard", "teaser-entrance"))),
    ("VARIANT_RULES", "forbidden block type for the variant", lambda d: d["nodes"][3]["content"]["blocks"].append({"type": "video", "poster": {"assetRole": "photo.stock-person", "src": "/assets/photos/story-1.webp"}})),
    ("VARIANT_RULES", "hairline FAQ given a title", lambda d: d["nodes"][4]["content"].__setitem__("title", "FAQ")),
    ("INLINE_HTML_SUBSET", "script-ish tag in copy", lambda d: d["nodes"][3]["content"]["blocks"][2].__setitem__("html", "Read <span>this</span> first.")),
    ("NO_EXTERNAL_URLS", "external URL inside copy", lambda d: d["nodes"][3]["content"]["blocks"][2].__setitem__("html", "See https://example.com for more.")),
    # runtime
    ("MAX_WORDS", "maxWords overflow on a real field", lambda d: d["nodes"][1]["content"].__setitem__("title", " ".join(["word"] * 80))),
    ("MAX_WORDS", "head title overflow", lambda d: d["head"].__setitem__("title", " ".join(["word"] * 60))),
]


def sv_node(sid, var, prof=None):
    n = synth_node(sid, var, 99)
    n["id"] = "x-" + sid.replace(".", "-")
    if prof:
        n["motion"] = {"profile": prof, "reducedMotionFallback": REPO["profiles"][prof]["reducedMotionFallback"]}
    return n


EXTRA = [
    ("ONE_HERO", "second hero on the homepage", lambda d: d["nodes"].insert(2, sv_node("hero.headline", "plain")), HOME),
    ("HOME_ROUTE_ONLY", "homepage-only section on another route", lambda d: d.update({"route": "/about"}), None),
    ("ROUTE_NODE_RULES", "healthcare event block on a product route", lambda d: d["nodes"].insert(idx(d, "cta.callout-row") + 1, sv_node("form.event-demo", "standard")), synth_page("template.aeo-detail")),
    ("ROUTE_VARIANT", "industry hero variant on a product route", lambda d: d["nodes"][1].__setitem__("variant", "industry") or d["nodes"][1]["content"].update({"byline": "x", "selfServe": "x"}), synth_page("template.aeo-detail")),
    ("MAX_PER_PAGE", "split-text repeated with the same variant", lambda d: d["nodes"][4].__setitem__("variant", "mission"), ABOUT),
    ("TEASER_MATCHES_ROUTE", "teaser missing on a site route", lambda d: d["nodes"].pop(), HOME),
    ("LINK_TARGETS", "dead internal link (warn severity)", lambda d: d["nodes"][8]["content"].__setitem__("href", "/not-a-route"), None),
]


def run():
    fails = 0
    print("== controls")
    controls = [("example.pagespec.json", EX)] + [(tid, synth_page(tid)) for tid in sorted(REPO["templates"])]
    for name, doc in controls:
        e = errors(doc)
        ok = not e
        fails += not ok
        print(f"  [{'PASS' if ok else 'FAIL'}] control {name}: {len(e)} error(s)" + ("" if ok else f" {e[:3]}"))
    print("== glossary term link (intentional 404) is not flagged")
    g = mut(lambda d: d["nodes"][8]["content"].__setitem__("href", "/glossary/first-response-time"))
    w = [r for r in sv.validate(g, REPO) if r[1] == "LINK_TARGETS"]
    fails += bool(w)
    print(f"  [{'PASS' if not w else 'FAIL'}] /glossary/<slug> link accepted ({len(w)} finding)")
    print("== mutations (each must be rejected by the named rule)")
    for rule, desc, fn in MUTATIONS:
        res = sv.validate(mut(fn), REPO)
        hit = any(r[1] == rule and r[0] == "error" for r in res)
        fails += not hit
        print(f"  [{'PASS' if hit else 'FAIL'}] {rule:<22} {desc}" + ("" if hit else f"  got {res[:3]}"))
    for rule, desc, fn, base in EXTRA:
        b = base or (HOME if rule == "HOME_ROUTE_ONLY" else EX)
        res = sv.validate(mut(fn, b), REPO)
        want = "warn" if rule == "LINK_TARGETS" else "error"
        hit = any(r[1] == rule and r[0] == want for r in res)
        fails += not hit
        print(f"  [{'PASS' if hit else 'FAIL'}] {rule:<22} {desc}" + ("" if hit else f"  got {res[:3]}"))
    print("== pinned asset-role policy (different-but-valid value)")
    roles = copy.deepcopy(REPO["roles"])
    roles["roles"]["photo.stock-person"]["generationPolicy"] = "may-generate-new"
    repo2 = dict(REPO, roles=roles)
    res = sv.validate(EX, repo2)
    hit = any(r[1] == "ASSET_ROLE_POLICY" for r in res)
    fails += not hit
    print(f"  [{'PASS' if hit else 'FAIL'}] ASSET_ROLE_POLICY      photo.stock-person repinned to may-generate-new")
    total = len(controls) + 1 + len(MUTATIONS) + len(EXTRA) + 1
    print(f"\n{total - fails}/{total} checks passed ({len(MUTATIONS) + len(EXTRA) + 1} mutations, {len(controls)} controls + 1 exception control)")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(run())
