require('dotenv').config();
const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { username, password, groupName } = req.body;

  if (!username || !password || !groupName) {
    return res.json({ error: 'missing field' });
  }

  const userPrincipalName = username + '@' + process.env.AZ_DOMAIN;

  console.log(password);
  shell.exec(`${scriptDir}/readerUser.sh ${username} ${password} ${userPrincipalName} ${groupName}`, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json({ success: `User ${userPrincipalName} created` });
    }
  });

});


module.exports = router;