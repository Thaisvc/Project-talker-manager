const { readFiles } = require('../util/utilFs');

const validateId = async (req, res, next) => {
    console.log('midllee');
    const id = Number(req.params.id);
    const allSpeakerFile = await readFiles();
   if (allSpeakerFile.some((speaker) => speaker.id === id)) {
    return next();
   }
   res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = { validateId };