# 🦥 FlemmAI - Votre Assistant Anti-Flemme

> Parce que même la flemme mérite d'être automatisée.

## 🤔 Pourquoi ?

Vous connaissez ce moment où :
- Votre chef vous demande un résumé de votre journée
- Vos collègues attendent une PR bien documentée
- Vous devez faire une revue de code
- Vous avez la flemme d'écrire tout ça
- Vous préférez aller boire un café

**FlemmAI** est là pour vous sauver ! 

## 🚀 Installation

### Pour les ultra-flemmards (utilisateurs)

```bash
# Installez les dépendances
npm install

# Copiez le .env.example en .env
cp .env.example .env

# Ajoutez votre clé API Gemini (si vous n'avez pas la flemme)
# Trouvable ici : https://aistudio.google.com/app/apikey?hl=fr
```

### Pour les moins flemmards (développeurs)

```bash
# Clonez le repo (si vous avez la force)
git clone https://github.com/votre-repo/flemmai.git
cd flemmai

# Installez les dépendances
npm install

# Construisez le binaire pour votre OS
npm run build

# Ou pour tous les OS (si vous êtes vraiment motivé)
npm run build:all
```

Les binaires seront générés dans le dossier `dist/` :
- `dist/flemmai-linux` pour les pingouins
- `dist/flemmai-macos` pour les pommes
- `dist/flemmai-win.exe` pour les fenêtres

## 💤 Utilisation

Pour les ultra-flemmards, trois commandes suffisent :

```bash
cd <votre projet>

# Pour générer une PR qui claque
flemmai --pr

# Pour un daily summary qui en jette
flemmai --dailyseum

# Pour une revue de code qui impressionne
flemmai --review
```

Pour les ultra-ultra-flemmards, créez un alias :

```bash
alias flemmai="node <path/to/flemmai>index.js"
# Ou si vous utilisez le binaire
alias flemmai="~/.flemmai/flemmai"
```

## ⚡ Fonctionnalités

- 📝 **Daily Summary**
  - Analyse votre git log (parce que qui se souvient de ce qu'il a fait ?)
  - Mode interactif avec questions pour les courageux
  - Mode `--dailyseum` pour les ultra-flemmards

- 🔄 **Description de PR**
  - Génère des PR stylées automatiquement
  - Ajoute des emojis parce que c'est plus joli
  - Impressionne vos collègues sans effort

- 🔍 **Revue de Code**
  - Analyse votre code comme un pro
  - Génère des suggestions d'amélioration
  - Fournit des instructions Cursor AI pour les appliquer
  - Le tout sans quitter votre pause café

## 🛠️ Build et Développement

### Prérequis
- Node.js >= 18
- npm >= 8
- Une clé API Gemini
- Un café bien chaud

### Structure du projet
```
flemmai/
├── dist/               # Binaires générés
├── templates/          # Templates Markdown
│   ├── dailysum.md
│   └── pr.md
├── index.js           # Point d'entrée
├── gitUtils.js        # Utilitaires Git
├── fileUtils.js       # Gestion des fichiers
├── prompts.js         # Prompts pour l'IA
└── package.json       # Configuration npm
```

### Scripts npm disponibles
```bash
# Construction du binaire pour votre OS
npm run build

# Construction pour tous les OS
npm run build:all
```

### Configuration
Créez un fichier `.env` avec :
```env
API_KEY=votre_clé_api_gemini
```

## 🎯 Public cible

- Développeurs atteints de flemme chronique
- Professionnels de la procrastination
- Experts en optimisation de pauses café
- Champions du "je le ferai plus tard"

## ⚠️ Avertissement

Ce programme ne guérit pas la flemme, il l'optimise. Les effets secondaires peuvent inclure :
- Plus de temps pour procrastiner
- Des PR tellement bien écrites que vos collègues vont devenir suspicieux
- Une dépendance à l'automatisation
- Une augmentation de votre consommation de café
- Des revues de code plus pertinentes que celles de vos seniors

## 🤝 Contribution

1. Forkez le projet
2. Créez votre branche
3. Ayez la flemme de faire des modifications
4. Utilisez FlemmAI pour générer votre PR
5. Soumettez-la

## 📝 License

MIT - Faites-en ce que vous voulez, on a la flemme de mettre des restrictions.

---

*Fait avec ❤️ et beaucoup de café par un développeur qui avait la flemme d'écrire des PR, des daily summaries et des revues de code.*
