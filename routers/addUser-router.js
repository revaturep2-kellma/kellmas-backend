require('dotenv').config();
const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const userPrincipalName = username + '@' + process.env.AZ_DOMAIN;

  if (!username) {
    return res.json({ error: 'missing field `username`' });
  }

  if (!password) {
    return res.json({ error: 'missing field `password`' });
  }

  shell.exec(`${scriptDir}/findGroup.sh "${req.user.oid}"`, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      stdout = JSON.parse(stdout);
      if (!stdout || stdout.role !== 'Owner') {
        return res.json({ error: 'Insufficient privilege. Must be owner to create a new user.' });
      }

      shell.exec(`${scriptDir}/readerUser.sh "${username}" "${password}" "${userPrincipalName}" "${stdout.groupName}"`, (code, stdout, stderr) => {
        if (stderr) {
          return res.json({ error: stderr });
        } else {
          return res.json({ success: `User ${userPrincipalName} created` });
        }
      });
    }
  });
});


module.exports = router;