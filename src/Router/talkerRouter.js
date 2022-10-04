const express = require('express');

const router = express.Router();

const readFile = require('../util/utilFs');

const HTTP_OK_STATUS = 200;

router.get('/', async (req, res) => {
 const allSpeaker = await readFile();
  
   res.status(HTTP_OK_STATUS).json(allSpeaker);
});

module.exports = router;