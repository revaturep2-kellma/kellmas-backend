const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { vmName, groupName, netName } = req.body;

  if (!vmName || !groupName || !netName) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/vm.sh ${vmName} ${groupName} ${netName} `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `VM ${vmName} created` });
    }
  });

});


module.exports = router;