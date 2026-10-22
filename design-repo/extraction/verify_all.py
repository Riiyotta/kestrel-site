#!/usr/bin/env python3
"""One-shot integrity check for the design-repo. Exit 0 = no failures (warnings allowed).

Checks: self-containment (no absolute machine paths, entryPoints inside the repo), schema freshness + Draft-07
meta-validation, example validates with zero findings, allowlist parity (sections / primitives / components /
asset roles / variants / motion profiles), allowlistVersion parity with the manifest, manifest counts recomputed
from disk, graph rule ids == validator rule ids, theme resolution, pinned asset-role policies, template coverage,
copy-budget rule, framework/font vocabulary scan, and citation validity (path exists, line range in bounds, and the
cited 'contains' snippet really sits inside the range). Citations point at the source project next to the repo;
when no such tree exists they are reported as warnings, not failures.

Usage: python3 extraction/verify_all.py [--source PATH_TO_SOURCE_PROJECT]
extraction/prove_drift.py proves the parity / citation / count / version / pinned-policy checks fail on bad input.
"""
import glob
import json
import math
import os
import re
import sys

DR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(DR, "schema"))

FAILS, WARNS = [], []


def fail(m):
    FAILS.append(m)


def warn(m):
    WARNS.append(m)


def load(rel):
    with open(os.path.join(DR, rel), encoding="utf-8") as f:
        return json.load(f)


def all_files():
    for root, _, files in os.walk(DR):
        for f in files:
            yield os.path.join(root, f)


def main(argv):
    src = os.path.dirname(DR)
    if "--source" in argv:
        src = os.path.abspath(argv[argv.index("--source") + 1])
    import jsonschema
    import build_schema
    import semantic_validate as sv

    # 1 self-containment
    abs_rx = re.compile("|".join(["/" + "Us" + "ers/", "/ho" + "me/", "C:" + "\\\\" + "Us" + "ers", "/pri" + "vate/tmp"]))
    for p in all_files():
        if p.endswith((".json", ".md", ".py")):
            txt = open(p, encoding="utf-8").read()
            if abs_rx.search(txt):
                fail(f"absolute machine path in {os.path.relpath(p, DR)}")
        if os.path.basename(p) in (".DS_Store", "Thumbs.db", "desktop.ini") or "__MACOSX" in p:
            fail(f"junk file {os.path.relpath(p, DR)}")
    man = load("registry.manifest.json")
    for ep in man["entryPoints"].values():
        if ep.startswith("..") or os.path.isabs(ep) or not os.path.exists(os.path.join(DR, ep)):
            fail(f"entryPoint {ep!r} is not a file inside design-repo/")

    # 2 schema freshness + meta-validation
    schema = load("schema/pagespec.schema.json")
    if json.dumps(build_schema.build(), sort_keys=True) != json.dumps(schema, sort_keys=True):
        fail("schema/pagespec.schema.json is out of date (run schema/build_schema.py)")
    try:
        jsonschema.Draft7Validator.check_schema(schema)
    except jsonschema.SchemaError as e:
        fail(f"schema is not valid draft-07: {e.message}")
    ex = load("schema/example.pagespec.json")
    res = sv.validate(ex)
    if res:
        fail(f"example.pagespec.json has findings: {res[:3]}")

    # 3 allowlist parity
    allow = load("tokens/llm/component-allowlist.json")
    secs = {}
    for f in glob.glob(os.path.join(DR, "sections", "*.json")):
        d = json.load(open(f, encoding="utf-8"))
        if os.path.basename(f) != d["id"] + ".json":
            fail(f"section file name {os.path.basename(f)} != id {d['id']}")
        secs[d["id"]] = d
    for sid in set(allow["sections"]) - set(secs):
        fail(f"allowlist phantom section {sid} (no contract file)")
    for sid in set(secs) - set(allow["sections"]):
        fail(f"section {sid} has no allowlist entry")
    for sid in set(allow["sections"]) & set(secs):
        if sorted(secs[sid]["variants"]) != allow["sections"][sid]["variants"]:
            fail(f"allowlist variants drift for {sid}")
        if secs[sid]["motion"]["allowedProfiles"] != allow["sections"][sid]["motionProfiles"]:
            fail(f"allowlist motion profiles drift for {sid}")
    for kind in ("primitives", "components"):
        files = {f"{kind[:-1]}.{os.path.basename(f)[:-5]}" for f in glob.glob(os.path.join(DR, kind, "*.json"))}
        for x in set(allow[kind]) - files:
            fail(f"allowlist phantom {kind[:-1]} {x}")
        for x in files - set(allow[kind]):
            fail(f"{kind[:-1]} {x} has no allowlist entry")
    node_props = sorted(schema["definitions"]["node"]["properties"])
    if sorted(allow["nodeProperties"]) != node_props:
        fail(f"allowlist nodeProperties {allow['nodeProperties']} != schema node properties {node_props}")
    if sorted(allow["motionProperties"]) != sorted(schema["definitions"]["motion"]["properties"]):
        fail("allowlist motionProperties drift from schema")
    roles = load("assets/asset-roles.json")
    settable = sorted(r for r, v in roles["roles"].items() if v["pageSpecSettable"])
    used = set()

    def scan(x):
        if isinstance(x, dict):
            if "assetRole" in x and isinstance(x["assetRole"], dict) and "const" in x["assetRole"]:
                used.add(x["assetRole"]["const"])
            for v in x.values():
                scan(v)
        elif isinstance(x, list):
            for v in x:
                scan(v)
    scan(schema)
    if sorted(used) != settable or allow["assetRoles"] != settable:
        fail(f"asset-role parity: schema {sorted(used)} / settable {settable} / allowlist {allow['assetRoles']}")
    for r, pol in roles["pinnedPolicies"].items():
        if roles["roles"].get(r, {}).get("generationPolicy") != pol:
            fail(f"pinned policy broken: {r} must be {pol}")
    for r, v in roles["roles"].items():
        if v["generationPolicy"] not in roles["generationPolicies"]:
            fail(f"role {r} has unknown policy {v['generationPolicy']}")

    # 4 versions + counts
    if man["allowlistVersion"] != allow["version"]:
        fail(f"manifest allowlistVersion {man['allowlistVersion']} != allowlist version {allow['version']}")
    tpl = load("templates/templates.json")

    def ntok(o):
        if isinstance(o, dict):
            return 1 if "$value" in o else sum(ntok(v) for k, v in o.items() if not k.startswith("$"))
        return 0
    foundation = sum(ntok(load(os.path.relpath(f, DR))) for f in glob.glob(os.path.join(DR, "tokens/00-foundation/*.json")) if not f.endswith("motion.json"))
    counts = {
        "foundationTokens": foundation, "motionAtoms": len(load("tokens/00-foundation/motion.json")["motion"]), "motionProfiles": len(load("tokens/10-semantic/motion.json")["profiles"]),
        "semanticTokens": len(load("tokens/themes/light.json")["resolved"]), "componentTokens": len(load("tokens/llm/token-catalog.json")["component"]),
        "primitives": len(glob.glob(os.path.join(DR, "primitives/*.json"))), "components": len(glob.glob(os.path.join(DR, "components/*.json"))),
        "sections": len(secs), "templates": len(tpl["templates"]), "pageRoutes": sum(len(t["routes"]) for t in tpl["templates"].values()),
        "nonPageRoutes": len(tpl["routing"]["nonPageRoutes"]), "assetRoles": len(roles["roles"]), "graphRules": len(load("compatibility/graph.json")["rules"]),
    }
    counts["routesTotal"] = counts["pageRoutes"] + counts["nonPageRoutes"]
    for k, v in counts.items():
        if man["counts"].get(k) != v:
            fail(f"manifest counts.{k} = {man['counts'].get(k)} but disk says {v}")
    for k in set(man["counts"]) - set(counts):
        fail(f"manifest counts.{k} is not recomputed by verify_all")

    readme = open(os.path.join(DR, "README.md"), encoding="utf-8").read()
    for line in (f"| sections | {counts['sections']} |", f"| templates (page shapes) | {counts['templates']} |", f"| primitives / components | {counts['primitives']} / {counts['components']} |",
                 f"| page routes / non-page routes / total | {counts['pageRoutes']} / {counts['nonPageRoutes']} / {counts['routesTotal']} |",
                 f"| motion atoms / motion profiles | {counts['motionAtoms']} / {counts['motionProfiles']} |", f"| compatibility rules | {counts['graphRules']} |"):
        if line not in readme:
            fail(f"README count line stale or missing: {line}")
    if f"| foundation tokens (colour, type, radius, elevation, gradient, spacing, breakpoint) | {counts['foundationTokens']} |" not in readme:
        fail("README foundation token count stale")

    # 5 graph <-> validator
    gids = {r["id"] for r in load("compatibility/graph.json")["rules"]}
    if gids != sv.IMPLEMENTED_RULES:
        fail(f"graph/validator rule drift: only in graph {gids - sv.IMPLEMENTED_RULES}, only in validator {sv.IMPLEMENTED_RULES - gids}")

    # 6 theme resolution
    F = {}

    def flat(prefix, o):
        if isinstance(o, dict) and "$value" in o:
            F[prefix] = o["$value"]
        elif isinstance(o, dict):
            for k, v in o.items():
                if not k.startswith("$"):
                    flat(f"{prefix}.{k}" if prefix else k, v)
    for f in glob.glob(os.path.join(DR, "tokens/00-foundation/*.json")):
        for k, v in json.load(open(f, encoding="utf-8")).items():
            if not k.startswith("$") and k != "motion":
                flat(k, v)
    for k, v in load("tokens/themes/light.json")["resolved"].items():
        ref = v["ref"].strip("{}")
        if ref not in F or F[ref] != v["value"]:
            fail(f"theme entry {k} does not resolve ({ref})")
    for c, d in load("tokens/20-component/component-tokens.json")["component"].items():
        for k, v in d.items():
            if k != "measuredFrom" and v["$value"].strip("{}") not in F:
                fail(f"component token {c}.{k} references missing {v['$value']}")
    cats = set(F_k.split(".")[0] for F_k in F) | {"motion"}
    for c in load("tokens/llm/token-policy.json")["categories"]:
        if c not in cats:
            fail(f"token-policy category {c!r} is not a real token key")

    # 7 templates
    for t in tpl["templates"].values():
        for nd in t["nodes"]:
            s = secs.get(nd["section"])
            if not s:
                fail(f"{t['id']} references missing section {nd['section']}")
            elif any(v not in s["variants"] for v in nd["variants"]):
                fail(f"{t['id']} uses unknown variant of {nd['section']}")
    usedsec = {nd["section"] for t in tpl["templates"].values() for nd in t["nodes"]}
    for sid in set(secs) - usedsec:
        fail(f"section {sid} is used by no template")
    rts = [r for t in tpl["templates"].values() for r in t["routes"]]
    if len(rts) != len(set(rts)):
        fail("a route is assigned to more than one template")

    # 8 copy budgets + vocabulary
    mv = load("extraction/measured-values.json")
    budgets = set()
    for k, b in mv["copyBudgets"].items():
        o = b["observedMaxWords"]
        if b["budget"] != o + max(1, math.ceil(o * 0.2)):
            fail(f"copy budget {k} breaks the documented rule")
        budgets.add(b["budget"])

    def mw(x, where):
        if isinstance(x, dict):
            if "maxWords" in x and x["maxWords"] not in budgets:
                fail(f"{where}: maxWords {x['maxWords']} has no measured copy budget")
            for v in x.values():
                mw(v, where)
        elif isinstance(x, list):
            for v in x:
                mw(v, where)
    for sid, s in secs.items():
        mw(s["contentModel"], sid)
    vocab = re.compile(r"className|useState|useEffect|(?<!\.)\bjsx\b|tailwind|framer|Cirka|Ginto", re.I)
    for d in ("sections", "primitives", "components", "templates", "compatibility", "tokens", "schema", "assets"):
        for p in glob.glob(os.path.join(DR, d, "**", "*.json"), recursive=True):
            m = vocab.search(open(p, encoding="utf-8").read())
            if m:
                fail(f"framework/font vocabulary {m.group(0)!r} in {os.path.relpath(p, DR)}")
    for p in glob.glob(os.path.join(DR, "**", "*"), recursive=True):
        if p.endswith((".json", ".md")) and re.search(r"Cirka|Ginto", open(p, encoding="utf-8").read()):
            fail(f"commercial font name in {os.path.relpath(p, DR)}")

    # 9 citations
    cites = mv["citations"]
    keys = set()

    def collect(x):
        if isinstance(x, dict):
            for k, v in x.items():
                if k in ("measuredFrom", "longestInstanceAt", "noTeaserEvidence"):
                    for c in (v if isinstance(v, list) else [v]):
                        keys.add(c)
                collect(v)
        elif isinstance(x, list):
            for v in x:
                collect(v)
    for p in glob.glob(os.path.join(DR, "**", "*.json"), recursive=True):
        collect(json.load(open(p, encoding="utf-8")))
    for k in sorted(keys - set(cites)):
        fail(f"citation key {k!r} is not in measured-values.json")
    have_src = os.path.isdir(os.path.join(src, "src")) and os.path.exists(os.path.join(src, "package.json"))
    checked = 0
    if not have_src:
        warn(f"no sibling source tree found: {len(cites)} external citations not resolved (graceful degradation)")
    else:
        cache = {}
        for k, c in cites.items():
            p = os.path.join(src, c["path"])
            if not os.path.exists(p):
                fail(f"citation {k}: {c['path']} does not exist")
                continue
            lines = cache.setdefault(p, open(p, encoding="utf-8").read().split("\n"))
            m = re.fullmatch(r"(\d+)(?:-(\d+))?", c["lines"])
            if not m:
                fail(f"citation {k}: bad range {c['lines']}")
                continue
            a, b = int(m.group(1)), int(m.group(2) or m.group(1))
            if a < 1 or b < a or b > len(lines):
                fail(f"citation {k}: {c['path']}:{c['lines']} exceeds file length {len(lines)}")
                continue
            if c["contains"] not in "\n".join(lines[a - 1:b]):
                fail(f"citation {k}: {c['path']}:{c['lines']} does not contain {c['contains']!r}")
                continue
            checked += 1

    print(f"verify_all: {len(FAILS)} failure(s), {len(WARNS)} warning(s)")
    print(f"  counts: {json.dumps(counts)}")
    print(f"  citations: {len(cites)} keys, {checked} resolved against source" + ("" if have_src else " (source absent)"))
    print(f"  copy budgets: {len(mv['copyBudgets'])}; allowlist {allow['version']}; asset roles settable {settable}")
    for w in WARNS:
        print(f"  [warn] {w}")
    for f in FAILS[:40]:
        print(f"  [FAIL] {f}")
    return 1 if FAILS else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
