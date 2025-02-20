const {
  GoogleGenerativeAI,
  GenerateContentRequest,
  ContentType,
} = require("@google/generative-ai");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
const API_KEY = process.env.API_KEY;
const PROJECTS_TO_SUMMARIZE = process.cwd();

const args = process.argv.slice(2);
const isPR = args.includes("--pr");
const isDailySum = args.includes("--dailyseum");

console.log("PROJECTS_TO_SUMMARIZE", PROJECTS_TO_SUMMARIZE);
if (!isPR && !isDailySum) {
  console.error(
    "Je sais que t'as la flemme, mais précise au moins --pr ou --dailyseum"
  );
  process.exit(1);
}
const DAILY_SUM_PROMPT =
  "À partir des fichiers fournis représentant mon historique de commandes Bash, mon git diff et mon git log, génère-moi le résumé de ma journée sous la forme du deuxième fichier en français.";

const PR_PROMPT =
  "À partir des fichiers fournis représentant mon historique de commandes Bash, mon git diff et mon git log, génère-moi une description de pull request pour GitHub, rédigée en français et bien structurée. \
  Formate le résultat de manière lisible, en t'inspirant de la structure du deuxième fichier fourni. \
  Ajoute des petites icônes pertinentes pour rendre la présentation plus attractive. \
  Assure-toi que la description contient : \
  - Un résumé clair et concis des modifications apportées. \
  - Une liste des principales améliorations, corrections de bugs ou ajouts de fonctionnalités. \
  - Une section expliquant pourquoi ces changements sont nécessaires. \
  - Un éventuel rappel des tickets ou issues liés. \
  - Une section pour les tests effectués. \
  Utilise un ton professionnel mais engageant.";

async function generateDailySum() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = isDailySum ? DAILY_SUM_PROMPT : PR_PROMPT;

  if (!getGitHistory().length || !getCurrentBranchGitHistory().length) {
    console.error("Aucun historique de git trouvé");
    process.exit(1);
  }
  if (!getDailysum().length) {
    console.error("Aucun résumé de journée trouvé");
    process.exit(1);
  }
  if (!getPR().length) {
    console.error("Aucune pull request trouvée");
    process.exit(1);
  }

  const request = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },

          {
            inline_data: {
              mime_type: "text/plain",
              data: isDailySum ? getGitHistory() : getCurrentBranchGitHistory(),
            },
          },
          {
            inline_data: {
              mime_type: "text/plain",
              data: isDailySum ? getDailysum() : getPR(),
            },
          },
        ],
      },
    ],
  };

  const result = await model.generateContent(request);
  console.log(result.response.text());
}

function getDailysum() {
  const bashHistory = fs.readFileSync(
    path.join(__dirname, "templates", "dailysum.md"),
    "utf8"
  );
  return Buffer.from(bashHistory).toString("base64");
}

function getPR() {
  const bashHistory = fs.readFileSync(
    path.join(__dirname, "templates", "pr.md"),
    "utf8"
  );
  return Buffer.from(bashHistory).toString("base64");
}

function getCurrentBranchGitHistory() {
  const { execSync } = require("child_process");

  const gitDiffCurrentBranchDevelop = execSync(
    `cd ${PROJECTS_TO_SUMMARIZE} && git diff develop`,
    { encoding: "utf8" }
  );

  return Buffer.from(gitDiffCurrentBranchDevelop).toString("base64");
}

function getGitHistory() {
  const { execSync } = require("child_process");

  let allHistory = "";

  try {
    // Obtenir l'historique Git des dernières 24 heures
    const gitLog = execSync(
      `cd ${PROJECTS_TO_SUMMARIZE} && git log --since="24 hours ago" --pretty=format:"%h - %an, %ar : %s"`,
      { encoding: "utf8" }
    );

    // Obtenir les différences Git
    const gitDiff = execSync(`cd ${PROJECTS_TO_SUMMARIZE} && git diff`, {
      encoding: "utf8",
    });

    allHistory += `\nCommits récents:\n${gitLog}\n`;
    allHistory += `\nModifications en cours:\n${gitDiff}\n`;
  } catch (error) {
    console.error(error);
  }

  return Buffer.from(allHistory).toString("base64");
}

generateDailySum();
