require('dotenv').config();
const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts');

router.get('/', (req, res) => {

  shell.exec(`${scriptDir}/findGroup.sh "${req.user.oid}"`, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      stdout = JSON.parse(stdout);
      shell.exec(`${scriptDir}/showResources.sh ${stdout.groupName}`, (code, stdout, stderr) => {
        if (stderr) {
          return res.json([]);
        } else {
          return res.json(JSON.parse(stdout));
        }
      });
    }
  });
});


router.delete('/', (req, res) => {
  const { id } = req.body;

  shell.exec(`${scriptDir}/findGroup.sh "${req.user.oid}"`, (code, stdout, stderr) => {
    if (stderr) {
      return res.json({ error: stderr });
    } else {
      stdout = JSON.parse(stdout);
      if (!stdout || stdout.role !== 'Owner') {
        return res.json({ error: 'Insufficient privilege. Must be owner to create a new user.' });
      }
      shell.exec(`${scriptDir}/deleteResource.sh "${id}"`, (code, stdout, stderr) => {
        if (stderr) {
          return res.json({ error: stderr });
        } else {
          return res.json({ success: 'Deleted' });
        }
      });
    }
  });
});



module.exports = router;