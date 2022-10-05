const express = require('express');

const router = express.Router();
const { createRandomToken } = require('../util/utilFs');

router.post('/', async (_req, res) => {
    const tokenRaleatory = createRandomToken();
     res.status(200).json({ token: tokenRaleatory });
   });
   
module.exports = router;
