const express = require('express');

const router = express.Router();
const { createRandomToken, validations } = require('../util/utilFs');

router.post('/', async (req, res) => {
    const user = req.body;
    await validations(user);
    const tokenRaleatory = createRandomToken();
    res.status(200).json({ token: tokenRaleatory });
});

module.exports = router;
