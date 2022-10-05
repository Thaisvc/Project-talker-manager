const express = require('express');

const router = express.Router();

const { readFiles } = require('../util/utilFs');
const { validateId } = require('../middlewares/speakerMiddle');

router.get('/', async (_req, res) => {
 const allSpeakerFile = await readFiles();
  
   res.status(200).json(allSpeakerFile);
});

router.get('/:id', validateId, async (req, res) => {
  const id = Number(req.params.id);
  const allSpeakerFile = await readFiles();
  const person = allSpeakerFile.find((p) => p.id === id);
  res.json(person);
});

module.exports = router;