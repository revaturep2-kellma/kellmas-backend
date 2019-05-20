require('dotenv').config();
const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.get('/', (req, res) => {
  const groupName = req.user.preferred_username.split('@')[0];

  shell.exec(`${scriptDir}/showResources.sh ${groupName}`, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      return res.json(JSON.parse(stdout));
    }
  });
});


module.exports = router;