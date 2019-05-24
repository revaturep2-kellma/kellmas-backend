const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { nsgName, netName, location, netType } = req.body;

  if ( !nsgName || !netName || !location || !netType) {
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
      if ( netType === 'Private' ) {
        return       shell.exec(`${scriptDir}/privateNet.sh "${stdout.resourceGroup}" "${nsgName}" "${location}" "${netName}" `, (code, stdout, stderr) => {
          if (stderr) {
            return res.json({ error: stderr });
          } else {
            return res.json({ success: `Private network ${netName} created` });
          }
        });
      } else {
        return       shell.exec(`${scriptDir}/publicNet.sh "${stdout.resourceGroup}" "${nsgName}" "${location}" "${netName}" `, (code, stdout, stderr) => {
          if (stderr) {
            return res.json({ error: stderr });
          } else {
            return res.json({ success: `Public network ${netName} created` });
          }
        });
      }
    }
  });
});


module.exports = router;