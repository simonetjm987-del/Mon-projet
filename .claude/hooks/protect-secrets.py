#!/usr/bin/env python3
"""PreToolUse hook: block Claude from reading or editing secret files."""
import json, re, sys

data = json.load(sys.stdin)
inp = data.get("tool_input", {})
path = inp.get("file_path") or inp.get("path") or ""
cmd = inp.get("command", "")
pattern = re.compile(r"(^|[/\s'\"])(\.env(\.[\w.-]+)?|[\w.-]+\.(key|pem|p12))(\s|$|['\"])")
if (path and pattern.search(path) and not path.endswith(".env.example")) or (cmd and pattern.search(cmd) and ".env.example" not in cmd):
    print("Bloqué : fichier de secrets (.env, .key, .pem). Utilise des variables d'environnement.", file=sys.stderr)
    sys.exit(2)
sys.exit(0)
