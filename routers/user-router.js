const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const { username, password, userPrincipalName } = req.body;

  if (!username || !password || !userPrincipalName) {
    return res.json({ error: 'missing field' });
  }

  res.json({ success: 'temp code make account here' });
});


module.exports = router;