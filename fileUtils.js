const fs = require('fs');
const path = require('path');

function readTemplateFile(templatePath, defaultContent = '') {
  try {
    if (!fs.existsSync(templatePath)) {
      console.warn(`⚠️ Le fichier ${path.basename(templatePath)} n'existe pas. Utilisation du contenu par défaut.`);
      return Buffer.from(defaultContent).toString('base64');
    }

    const content = fs.readFileSync(templatePath, 'utf8');
    return Buffer.from(content).toString('base64');
  } catch (error) {
    console.error(`❌ Erreur lors de la lecture du fichier ${path.basename(templatePath)}:`, error.message);
    return Buffer.from(defaultContent).toString('base64');
  }
}

function getDailysum() {
  return readTemplateFile(
    path.join(__dirname, 'templates', 'dailysum.md'),
    '# Résumé de la journée\n\n_Aucun contenu disponible_'
  );
}

function getPR() {
  return readTemplateFile(
    path.join(__dirname, 'templates', 'pr.md'),
    '# Description de la Pull Request\n\n_Aucun contenu disponible_'
  );
}

module.exports = {
  getDailysum,
  getPR
}; 