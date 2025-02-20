const PR_PROMPT = `À partir des fichiers fournis représentant mon historique de commandes Bash, mon git diff et mon git log, génère-moi une description de pull request pour GitHub, rédigée en français et bien structurée.
Formate le résultat de manière lisible, en t'inspirant de la structure du deuxième fichier fourni.
Ajoute des petites icônes pertinentes pour rendre la présentation plus attractive.
Assure-toi que la description contient :
- Un résumé clair et concis des modifications apportées.
- Une liste des principales améliorations, corrections de bugs ou ajouts de fonctionnalités.
- Un éventuel rappel des tickets ou issues liés.
- Une section pour les tests effectués.
Utilise un ton professionnel mais engageant.`;

const DAILY_SUM_PROMPT = `À partir des fichiers fournis et des réponses de l'utilisateur, génère-moi un résumé structuré de la journée en français.
Formate le résultat en Markdown avec la structure suivante :

## 📝 Résumé de la journée

### ✅ Principales réalisations
{Utilise les informations du Git log et la réponse sur l'achievement principal si fournie}

${'{Inclure la section Défis uniquement si des challenges ont été mentionnés}'}
### ⚠️ Défis et solutions
{Utilise les réponses sur les challenges}

### 🚀 Avancées sur les projets
{Combine les informations du Git diff et des réalisations}

${'{Inclure la section Idées uniquement si des suggestions ont été fournies}'}
### 💡 Idées et améliorations
{Utilise les suggestions d'amélioration fournies}

${'{Inclure la section Plan uniquement si des priorités ont été mentionnées}'}
### 📋 Plan pour demain
{Liste les priorités mentionnées}

N'inclus que les sections pour lesquelles il y a du contenu pertinent.
Utilise un ton professionnel mais engageant.`;

const DAILY_QUESTIONS = [
  {
    type: 'input',
    name: 'mainAchievement',
    message: '✨ Quelle a été votre réalisation la plus importante aujourd\'hui ?'
  },
  {
    type: 'input',
    name: 'challenges',
    message: '🤔 Avez-vous rencontré des défis particuliers ? Comment les avez-vous résolus ?'
  },
  {
    type: 'input',
    name: 'improvements',
    message: '💡 Avez-vous des idées d\'amélioration à noter ?'
  },
  {
    type: 'input',
    name: 'tomorrow',
    message: '🎯 Quelles sont vos priorités pour demain ?'
  }
];

const CODE_REVIEW_PROMPT = `Analyse le code fourni (git diff) et génère une revue de code constructive en français.
Structure ta réponse en Markdown avec les sections suivantes:

## 📋 Résumé des modifications

## ✨ Points positifs
- Liste des bonnes pratiques et choix pertinents

## 🔍 Suggestions d'amélioration
Pour chaque suggestion, fournis:
- Une description du problème
- Un exemple de code actuel (si pertinent)
- La solution proposée dans un bloc de code
- Une explication de l'amélioration

Exemple de format:
\`\`\`javascript:path/to/file.js
// Code actuel
function example() {
  // ...
}

// Code suggéré
function betterExample() {
  // ...
}
\`\`\`

## 🛡️ Sécurité et Performance
- Points d'attention sur la sécurité et les performances
- Inclure des exemples de code pour les corrections suggérées

## 💭 Remarques générales
- Autres commentaires constructifs

Sois précis dans tes suggestions et assure-toi de:
- Fournir le chemin du fichier pour chaque bloc de code
- Inclure des commentaires explicatifs dans les exemples de code
- Expliquer pourquoi les changements sont bénéfiques
- Mettre en évidence les impacts potentiels des modifications

Concentre-toi sur:
- La qualité du code
- Les bonnes pratiques
- La maintenabilité
- La performance
- La sécurité
`;

const CURSOR_PROMPT = `À partir de la revue de code précédente, génère des instructions claires et précises pour Cursor AI.
Structure la réponse en Markdown avec:

## 🤖 Instructions pour Cursor AI

Pour chaque fichier à modifier, fournis un bloc d'instructions comme ceci:

\`\`\`cursor
In file: path/to/file.js

Find and replace the following code:
// Current implementation
function example() {
  // ...
}

With:
// Improved implementation
function betterExample() {
  // ...
}

Then:
1. Add error handling...
2. Improve performance by...
3. ...
\`\`\`

Assure-toi que:
- Les instructions sont précises et séquentielles
- Le contexte est clairement défini
- Les modifications sont groupées par fichier
- Les changements sont expliqués étape par étape
`;

module.exports = {
  PR_PROMPT,
  DAILY_SUM_PROMPT,
  DAILY_QUESTIONS,
  CODE_REVIEW_PROMPT,
  CURSOR_PROMPT
}; 