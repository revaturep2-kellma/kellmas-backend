const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { groupName, servicePlanName, appName, gitrepo } = req.body;

  if (!groupName || !servicePlanName || appName || gitrepo) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/webApp.sh ${groupName} ${servicePlanName} ${appName} ${gitrepo} `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `App ${appName} created` });
    }
  });

});


module.exports = router;