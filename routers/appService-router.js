const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { groupName, servicePlanName } = req.body;

  if (!groupName || !servicePlanName) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/appService.sh ${groupName} ${servicePlanName} `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `App service plan ${servicePlanName} created` });
    }
  });

});


module.exports = router;