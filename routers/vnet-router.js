const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { groupName, netName, location } = req.body;

  if (!groupName || !netName || !location) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/vnet.sh "${groupName}" "${netName}" "${location}" `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `Network ${netName} created` });
    }
  });

});


module.exports = router;