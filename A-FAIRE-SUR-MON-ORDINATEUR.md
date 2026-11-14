# À faire sur mon ordinateur

Ce qui n'a pas pu être terminé dans la session cloud du 14/11/2026, à reprendre une fois l'ordinateur installé.

## 0. Prérequis (une seule fois)

- [ ] Installer **Node.js** (LTS) : https://nodejs.org
- [ ] Installer **Claude Code** : https://code.claude.com/docs
- [ ] Installer **uv** (installe les outils Python) : https://docs.astral.sh/uv/getting-started/installation/
- [ ] Installer **FFmpeg 6.1+** (nécessaire à ffmpeg-skill) : https://ffmpeg.org/download.html
- [ ] Installer **Docker Desktop** (nécessaire à Strix) : https://www.docker.com/products/docker-desktop/
- [ ] Récupérer le projet :
  ```bash
  git clone https://github.com/simonetjm987-del/Mon-projet.git
  cd Mon-projet
  git checkout claude/claude-code-5-tools-setup-ork35g
  ```
  Le hook anti-secrets et les 6 skills sont déjà dans le dépôt : rien à réinstaller pour eux.

## 1. Claude Code Setup — à relancer plus tard

- [ ] Installer le plugin sur l'ordinateur (la marketplace ajoutée dans le cloud n'est pas conservée) :
  ```bash
  claude plugin marketplace add anthropics/claude-plugins-official
  claude plugin install claude-code-setup@claude-plugins-official --scope project
  ```
- [ ] **Quand l'app aura du code**, demander à Claude : « recommande-moi des automatisations pour ce projet ».
  La première analyse n'avait rien à analyser (dépôt vide).

## 2. Find Skills — la recherche directe était bloquée

Le site `skills.sh` était bloqué par le réseau du cloud. Sur l'ordinateur :

- [ ] Tester la recherche : `npx skills find video editing`
- [ ] Vérifier que les skills se chargent : lancer `claude` dans le dossier et taper `/` pour voir la liste.

## 3. OmniRoute — volontairement non installé

Rien à faire. Si un jour tu veux l'essayer : uniquement sur un projet sans rien de confidentiel,
avec des fournisseurs **à clé API** (jamais de connexion par compte, cookie ou abonnement Claude).
Lien officiel : https://github.com/cheaper-inference/OmniRoute

## 4. Agent Reach — installé dans le cloud mais test impossible

Le réseau du cloud bloquait les services de lecture (r.jina.ai, mcp.exa.ai, API GitHub).

- [ ] Installer (⚠️ jamais le paquet PyPI `agent-reach`, ce n'est pas le bon) :
  ```bash
  uv tool install https://github.com/Panniantong/Agent-Reach/releases/latest/download/agent-reach.zip
  agent-reach setup
  ```
- [ ] Refaire le test sur une page publique :
  ```bash
  agent-reach read https://www.remotion.dev/
  agent-reach doctor --text
  ```
- [ ] Ne **pas** activer LinkedIn / Instagram / X / Facebook / Reddit sans réfléchir : risque de blocage
  du compte (utiliser un compte secondaire), conditions d'utilisation, RGPD.

## 5. Strix — à faire quand l'app tournera en local

- [ ] Créer une clé API **de modèle de texte** (OpenArt ne convient pas) :
  OpenRouter (https://openrouter.ai) ou Anthropic (https://console.anthropic.com).
- [ ] Installer (sans `curl | bash`) : `uv tool install strix-agent`
- [ ] Lancer Docker Desktop.
- [ ] Mettre la clé en variable d'environnement (jamais dans un fichier du projet) et scanner :
  ```bash
  export STRIX_TELEMETRY=0
  export STRIX_LLM="openrouter/<modèle>"
  export LLM_API_KEY="..."        # à taper dans le terminal, pas dans un fichier
  strix --target ./ --scan-mode quick
  strix --target http://localhost:3000   # ton app en local uniquement
  ```
- [ ] Rappel : uniquement ton app, en local ou en test. Jamais la production, jamais le site de quelqu'un d'autre.

## 6. Dépôt

- [ ] Fusionner la branche `claude/claude-code-5-tools-setup-ork35g` dans la branche principale
  (via une pull request sur GitHub).
