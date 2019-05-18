const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { displayName, password } = req.body;

  if (!groupName || !netName) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/vnet.sh ${groupName} ${netName} `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `Network ${netName} created` });
    }
  });

});


module.exports = router;