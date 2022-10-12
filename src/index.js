const express = require('express');
const bodyParser = require('body-parser');
require('express-async-errors');

const app = express();
app.use(bodyParser.json());

const talkerRoute = require('./Router/talkerRouter');
const loginRouter = require('./Router/loginRouter');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar //
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

//---------------------------------------------------------------------------------------------------------

app.use('/talker', talkerRoute);
app.use('/login', loginRouter);

app.use((error, _req, res, _next) => {
  res.status(error.status || 500).json({ message: `${error.message}` });
});
