#!/usr/bin/env python3
"""Prove that verify_all.py's drift checks actually fail on bad input.

For each injected defect: copy design-repo/ to a fresh OS temp dir, apply the defect, run verify_all.py on the copy
(pointing --source at the real source project when one is next to this repo, so citation checks run), and require a
non-zero exit with the expected failure text. Finally confirm the unmodified repo still passes.
Usage: python3 extraction/prove_drift.py
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile

DR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.dirname(DR)
HAVE_SRC = os.path.isdir(os.path.join(SRC, "src")) and os.path.exists(os.path.join(SRC, "package.json"))


def edit_json(root, rel, fn):
    p = os.path.join(root, rel)
    with open(p, encoding="utf-8") as f:
        d = json.load(f)
    fn(d)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)


def first_cite(d):
    return next(iter(d["citations"]))


CASES = [
    ("allowlist parity: phantom section entry", "allowlist phantom section", lambda r: edit_json(r, "tokens/llm/component-allowlist.json", lambda d: d["sections"].__setitem__("hero.phantom", {"variants": ["standard"], "motionProfiles": ["none"]}))),
    ("allowlist parity: orphan contract (entry removed)", "has no allowlist entry", lambda r: edit_json(r, "tokens/llm/component-allowlist.json", lambda d: d["sections"].pop("hero.glossary"))),
    ("allowlist parity: phantom primitive", "allowlist phantom primitive", lambda r: edit_json(r, "tokens/llm/component-allowlist.json", lambda d: d["primitives"].append("primitive.divider"))),
    ("allowlistVersion drift", "allowlistVersion", lambda r: edit_json(r, "tokens/llm/component-allowlist.json", lambda d: d.__setitem__("version", "9.9.9"))),
    ("manifest count drift", "manifest counts.sections", lambda r: edit_json(r, "registry.manifest.json", lambda d: d["counts"].__setitem__("sections", 999))),
    ("pinned asset policy changed to a different valid value", "pinned policy broken", lambda r: edit_json(r, "assets/asset-roles.json", lambda d: d["roles"]["logo.placeholder"].__setitem__("generationPolicy", "may-generate-new"))),
    ("graph rule without validator implementation", "graph/validator rule drift", lambda r: edit_json(r, "compatibility/graph.json", lambda d: d["rules"].append({"id": "INVENTED_RULE", "severity": "error", "rule": "x"}))),
    ("entryPoint outside the package", "is not a file inside design-repo", lambda r: edit_json(r, "registry.manifest.json", lambda d: d["entryPoints"].__setitem__("ia", "../ia.json"))),
]
if HAVE_SRC:
    CASES += [
        ("citation out of range", "exceeds file length", lambda r: edit_json(r, "extraction/measured-values.json", lambda d: d["citations"]["mo.pill-breath"].__setitem__("lines", "99999"))),
        ("citation in range but describing the wrong code", "does not contain", lambda r: edit_json(r, "extraction/measured-values.json", lambda d: d["citations"]["mo.pill-breath"].__setitem__("lines", "1-3"))),
        ("citation to a missing file", "does not exist", lambda r: edit_json(r, "extraction/measured-values.json", lambda d: d["citations"]["mo.pill-breath"].__setitem__("path", "src/missing.jsx"))),
    ]


def run_verify(root, source=None):
    cmd = [sys.executable, os.path.join(root, "extraction", "verify_all.py")]
    if source:
        cmd += ["--source", source]
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    bad = 0
    for name, expect, inject in CASES:
        with tempfile.TemporaryDirectory() as tmp:
            root = os.path.join(tmp, "design-repo")
            shutil.copytree(DR, root)
            inject(root)
            r = run_verify(root, SRC if HAVE_SRC else None)
            caught = r.returncode != 0 and expect in r.stdout
            bad += not caught
            print(f"  [{'CAUGHT' if caught else 'MISSED'}] {name}")
    if not HAVE_SRC:
        print("  [skip] citation drift cases need the source project next to the repo")
    r = run_verify(DR)
    clean = r.returncode == 0
    bad += not clean
    print(f"  [{'PASS' if clean else 'FAIL'}] unmodified repo passes verify_all")
    print(f"prove_drift: {len(CASES)} injected defects, {len(CASES) - (bad - (not clean))} caught")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
