require('dotenv').config();
const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.put('/', (req, res) => {
  const { user, role } = req.body;

  console.log(user, role);
  if (!user) {
    return res.json({ error: 'missing field `user`' });
  }

  if (!role) {
    return res.json({ error: 'missing field `role`' });
  }

  shell.exec(`${scriptDir}/findGroup.sh "${req.user.oid}"`, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      stdout = JSON.parse(stdout);
      if (!stdout || stdout.role !== 'Owner') {
        return res.json({ error: 'Insufficient privilege. Must be owner to create a new user.' });
      }
      shell.exec(`${scriptDir}/updateUser.sh "${user.principalName}" "${stdout.resourceGroup}" "${user.roleDefinitionName}" "${role}"`, (code, stdout, stderr) => {
        if (stderr) {
          return res.json({ error: stderr });
        } else {
          return res.json({ success: 'User role updated' });
        }
      });
    }
  });
});


module.exports = router;