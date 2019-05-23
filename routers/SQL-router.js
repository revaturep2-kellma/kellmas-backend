const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { serverPassword, serverUsername, location, serverName, dbName } = req.body;

  if (!serverPassword || !location || !serverUsername || !serverName || !dbName) {
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

      shell.exec(`${scriptDir}/SQL.sh "${serverPassword}" "${serverUsername}" "${location}" "${serverName}" "${stdout.groupName}" "${dbName}" `, (code, stdout, stderr) => {
        if (stderr) {
          return res.json({ error: stderr });
        } else {
          return res.json({ success: `SQL ${serverUsername} created` });
        }
      });
    }
  });
});


module.exports = router;