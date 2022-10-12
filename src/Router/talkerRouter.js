const express = require('express');
require('express-async-errors');
const fs = require('fs').promises;

const path = require('path');

const driret = path.resolve(__dirname, '..', 'talker.json');
const router = express.Router();

const { readFiles, writeFiles, schemaPeople } = require('../util/utilFs');
const { validateId, authenticated } = require('../middlewares/speakerMiddle');

router.get('/search', authenticated, async (req, res) => {
  const { q } = req.query;
  const talkerFile = await readFiles();

  if (q) {
   const talkUser = talkerFile.filter((user) => user.name.toLowerCase().includes(q.toLowerCase()));
   res.status(200).json(talkUser);
  }
  res.status(200).json([]);
});

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
  const { error } = await schemaPeople.validate(newUser);

  const file = await readFiles();
  info.id = file.length + 1;

  await writeFiles(info);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    res.status(201).json(info);
  }
});

router.put('/:id', authenticated, async (req, res) => {
  const userId = Number(req.params.id);
  const updateUser = { id: Number(userId), ...req.body };
  const { error } = schemaPeople.validate(req.body);
  const file = await readFiles();
  const getId = file.findIndex((ind) => ind.id === userId);
  file[getId] = updateUser;
  await fs.writeFile(driret, JSON.stringify(file));

  if (error) {
     res.status(400).json({ message: error.details[0].message });
  } else {
     res.status(200).json(updateUser);
  }
});

router.delete('/:id', authenticated, async (req, res) => {
  const idUser = Number(req.params.id);

  const talkerFile = await readFiles();
  const FindId = talkerFile.findIndex((index) => index.id === idUser);
  talkerFile.splice(FindId, 1);

  await fs.writeFile(driret, JSON.stringify(talkerFile));
  res.status(204).json();
});

module.exports = router;