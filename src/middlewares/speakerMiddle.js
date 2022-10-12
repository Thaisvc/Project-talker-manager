const { readFiles } = require('../util/utilFs');

const validateId = async (req, res, next) => {
    const id = Number(req.params.id);
    const allSpeakerFile = await readFiles();
    if (allSpeakerFile.some((speaker) => speaker.id === id)) {
        return next();
    }
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

async function authenticated(req, res, next) {
    const token = req.headers.authorization;
   
    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }

    if (token.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
}

module.exports = { validateId, authenticated };