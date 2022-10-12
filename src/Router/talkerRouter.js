const express = require('express');
require('express-async-errors');

const router = express.Router();

const { readFiles, writeFiles, validationUser } = require('../util/utilFs');
const { validateId, authenticated } = require('../middlewares/speakerMiddle');

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

router.post('/', authenticated, async (req, res) => {
  const info = req.body;
  const newUser = req.body;
  await validationUser(newUser);

  const file = await readFiles();
  info.id = file.length + 1;
  
  await writeFiles(info);
  return res.status(201).json(info);
 });

module.exports = router;