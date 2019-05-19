const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { username, password, userPrincipalName } = req.body;

  if (!username || !password || !userPrincipalName) {
    return res.json({ error: 'missing field' });
  }


  shell.exec(`${scriptDir}/readerUser.sh ${username} ${password} ${userPrincipalName} `, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `User ${userPrincipalName} created` });
    }
  });

});


module.exports = router;