const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { groupName, serverPassword, serverUsername, serverName, dbName } = req.body;

  if (!groupName || !serverPassword || !serverUsername || !serverName || !dbName) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/mySQL.sh ${groupName} ${serverPassword} ${serverUsername} ${dbName} `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `SQL ${serverUsername} created` });
    }
  });

});


module.exports = router;