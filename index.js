const {
  GoogleGenerativeAI,
  GenerateContentRequest,
  ContentType,
} = require("@google/generative-ai");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.API_KEY;
const PROJECTS_TO_SUMMARIZE = process.env.PROJECTS_TO_SUMMARIZE;

async function generateDailySum() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const request = {
    contents: [
      {
        parts: [
          {
            text: "A partir de ces fichiers fournies represenant mon bash history, mon git diff et mon git log, genere moi le résumé de ma journée sous la forme du deuxieme fichier",
          },

          {
            inline_data: {
              mime_type: "text/plain",
              data: getGitHistory(),
            },
          },
          {
            inline_data: {
              mime_type: "text/plain",
              data: getDailysum(),
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
  const bashHistory = fs.readFileSync("dailysum.md", "utf8");
  return Buffer.from(bashHistory).toString("base64");
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
