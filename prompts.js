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
- Liste des points à améliorer, avec exemples si possible

## 🛡️ Sécurité et Performance
- Points d'attention sur la sécurité et les performances

## 💭 Remarques générales
- Autres commentaires constructifs

Sois précis dans tes suggestions et fournis des exemples de code quand c'est pertinent.
Concentre-toi sur:
- La qualité du code
- Les bonnes pratiques
- La maintenabilité
- La performance
- La sécurité
`;

module.exports = {
  PR_PROMPT,
  DAILY_SUM_PROMPT,
  DAILY_QUESTIONS,
  CODE_REVIEW_PROMPT
}; 