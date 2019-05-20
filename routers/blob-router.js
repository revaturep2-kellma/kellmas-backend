const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { groupName, blobName, location, storagePlan } = req.body;

  if (!groupName || !blobName || !location || !storagePlan) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/blobStorage.sh ${groupName} ${blobName} ${location} ${storagePlan}`, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `Storage account ${blobName} created` });
    }
  });

});


module.exports = router;