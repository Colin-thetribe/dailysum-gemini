const { execSync } = require('child_process');

function getDefaultBranch() {
  try {
    // Check if develop branch exists
    execSync('git rev-parse --verify develop', { stdio: 'ignore' });
    return 'develop';
  } catch {
    return 'main';
  }
}

function getGitHistory() {
  let allHistory = '';

  try {
    // Get Git history from last 24 hours
    const gitLog = execSync(
      'git log --since="24 hours ago" --pretty=format:"%h - %an, %ar : %s"',
      { encoding: 'utf8' }
    );

    // Get current Git diff
    const gitDiff = execSync('git diff', { encoding: 'utf8' });

    allHistory += `\nCommits récents:\n${gitLog}\n`;
    allHistory += `\nModifications en cours:\n${gitDiff}\n`;

    return Buffer.from(allHistory).toString('base64');
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de l\'historique Git:', error.message);
    return '';
  }
}

function getCurrentBranchGitHistory() {
  try {
    const defaultBranch = getDefaultBranch();
    const gitDiff = execSync(`git diff ${defaultBranch}`, { encoding: 'utf8' });
    return Buffer.from(gitDiff).toString('base64');
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du diff de branche:', error.message);
    return '';
  }
}

module.exports = {
  getGitHistory,
  getCurrentBranchGitHistory
}; 