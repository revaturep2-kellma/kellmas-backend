const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { groupName, servicePlanName, servicePlan,location, webAppName, webAppType, webAppGitRepo } = req.body;

  if (!groupName || !servicePlanName || !servicePlan || !location || !webAppName || !webAppType || !webAppGitRepo) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/webApp.sh ${groupName} ${servicePlanName} ${servicePlan} ${location} ${webAppName} ${webAppType} ${webAppGitRepo} `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `App ${webAppName} created on ${servicePlanName} service plan` });
    }
  });

});


module.exports = router;