const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts/');

router.post('/', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.json('missing field');
  }

  shell.exec(`${scriptDir}user.sh ${username} ${password} ${email} `, (code, stdout, stderr) => {
    if (stderr) {
      res.json('there was a problem');
    } else {
      res.json(`Account created. Please log in with the email: ${email}`);
    }
  });

});


module.exports = router;