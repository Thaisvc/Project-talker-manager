const express = require('express');

const router = express.Router();
const { createRandomToken, schema } = require('../util/utilFs');

router.post('/', async (req, res) => {
    const { error } = await schema.validate(req.body);
    const tokenRaleatory = createRandomToken();
    if (error) {
        res.status(400).json({ message: error.details[0].message });
      } else {
        res.status(200).json({ token: tokenRaleatory });
      }
});

module.exports = router;
