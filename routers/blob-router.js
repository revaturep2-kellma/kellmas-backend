const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { blobName, location, storagePlan } = req.body;

  if (!blobName || !location || !storagePlan) {
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
      shell.exec(`${scriptDir}/blobStorage.sh "${stdout.groupName}" "${blobName}" "${location}" "${storagePlan}"`, (code, stdout, stderr) => {
        if (stderr) {
          return res.json({ error: stderr });
        } else {
          return res.json({ success: `Storage account ${blobName} created` });
        }
      });
    }
  });
});


module.exports = router;