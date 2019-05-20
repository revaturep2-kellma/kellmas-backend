const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { groupName, newASP } = req.body;

  if (!groupName || !newASP) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/appService.sh ${groupName} ${newASP} `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `App service plan ${newASP} created` });
    }
  });

});


module.exports = router;