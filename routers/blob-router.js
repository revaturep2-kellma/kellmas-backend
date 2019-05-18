const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { groupName, storageAccountName, appName } = req.body;

  if (!groupName || !storageAccountName, appName) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/blobStorage.sh ${groupName} ${storageAccountName}, ${appName} `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `Storage account ${storageAccountName} created` });
    }
  });

});


module.exports = router;