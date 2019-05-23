const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { servicePlanName, servicePlanType,location, webAppName, webAppType, webAppGitRepo } = req.body;

  if (!servicePlanName || !servicePlanType || !location || !webAppName || !webAppType || !webAppGitRepo) {
    return res.json({ error: 'missing field' });
  }

  shell.exec(`${scriptDir}/findGroup.sh "${req.user.oid}"`, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      stdout = JSON.parse(stdout);
      if (!stdout || stdout.role !== 'Owner') {
        return res.json({ error: 'Insufficient privilege. Must be owner to create a new user.' });
      }
      shell.exec(`${scriptDir}/webApp.sh "${stdout.resourceGroup}" "${servicePlanName}" "${servicePlanType}" "${location}" "${webAppName}" "${webAppType}" "${webAppGitRepo}" `, (code, stdout, stderr) => {
        if (stderr) {
          return res.json({ error: stderr });
        } else {
          return res.json({ success: `App ${webAppName} created on ${servicePlanName} service plan` });
        }
      });
    }
  });
});


module.exports = router;