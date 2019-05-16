const express = require('express');
const path = require('path');
const shell = require('shelljs');

const router = express.Router();
const scriptDir = path.join(__dirname, '../scripts/');

shell.exec(`${scriptDir}test.sh`);

module.exports = router;