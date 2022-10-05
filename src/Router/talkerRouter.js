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
  const team = allSpeakerFile.find((t) => t.id === id);
  res.json(team);
});
 
module.exports = router;