const { GoogleGenerativeAI } = require('@google/generative-ai');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const { PR_PROMPT, DAILY_SUM_PROMPT, DAILY_QUESTIONS } = require('./prompts');
const { getGitHistory, getCurrentBranchGitHistory } = require('./gitUtils');
const { getDailysum, getPR } = require('./fileUtils');

// Configuration
dotenv.config({ path: path.join(__dirname, '.env') });
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('❌ La clé API n\'est pas définie dans le fichier .env');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
const hasFlag = flag => args.includes(flag);

async function generateContent(isDailySum, userAnswers = {}) {
  // Filter out empty or negative answers
  const filteredAnswers = Object.fromEntries(
    Object.entries(userAnswers).filter(([_, value]) => {
      const cleanValue = value.trim().toLowerCase();
      return cleanValue && !['non', 'no', 'rien', 'none'].includes(cleanValue);
    })
  );

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const gitHistory = isDailySum ? getGitHistory() : getCurrentBranchGitHistory();
  const template = isDailySum ? getDailysum() : getPR();
  const prompt = isDailySum ? DAILY_SUM_PROMPT : PR_PROMPT;

  if (!gitHistory) {
    console.error('❌ Impossible de récupérer l\'historique Git');
    return;
  }

  const request = {
    contents: [{
      parts: [
        { text: prompt },
        {
          inline_data: {
            mime_type: 'text/plain',
            data: gitHistory
          }
        },
        {
          inline_data: {
            mime_type: 'text/plain',
            data: template
          }
        },
        // Add only non-empty user answers if it's a daily summary
        ...(isDailySum && Object.keys(filteredAnswers).length > 0 
          ? [{ text: `\nRéponses de l'utilisateur:\n${JSON.stringify(filteredAnswers, null, 2)}` }] 
          : [])
      ]
    }]
  };

  try {
    const result = await model.generateContent(request);
    const content = result.response.text();
    console.log(content);

    // Save to file
    const fileName = isDailySum ? 
      `daily-summary-${new Date().toISOString().split('T')[0]}.md` :
      `pr-description-${new Date().toISOString().split('T')[0]}.md`;
    
    fs.writeFileSync(fileName, content);
    console.log(`\n✅ Résultat sauvegardé dans ${fileName}`);
  } catch (error) {
    console.error('❌ Erreur lors de la génération du contenu:', error.message);
  }
}

async function promptQuestions() {
  console.log('\n📝 Quelques questions pour enrichir votre résumé quotidien:');
  return inquirer.prompt(DAILY_QUESTIONS);
}

async function main() {
  // Check for command line arguments first
  if (hasFlag('--pr')) {
    await generateContent(false);
    return;
  }
  
  if (hasFlag('--dailyseum')) {
    // Generate daily summary without questions when using --dailyseum flag
    await generateContent(true, {});
    return;
  }

  // If no arguments, use interactive mode
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Que souhaitez-vous générer ?',
      choices: [
        { name: '📝 Résumé quotidien', value: 'daily' },
        { name: '🔄 Description de PR', value: 'pr' }
      ]
    }
  ]);

  if (choice === 'daily') {
    const answers = await promptQuestions();
    await generateContent(true, answers);
  } else {
    await generateContent(false);
  }
}

// Update help message
if (hasFlag('--help') || hasFlag('-h')) {
  console.log(`
Usage: node index.js [options]

Options:
  --dailyseum  Générer un résumé quotidien rapide (sans questionnaire)
  --pr         Générer une description de PR
  --help,-h    Afficher cette aide

Sans option, lance le mode interactif avec questionnaire.
  `);
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Erreur inattendue:', error.message);
  process.exit(1);
});
