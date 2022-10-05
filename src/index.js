const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const talkerRoute = require('./Router/talkerRouter');

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
/* app.use('/:id', talkerRoute); */

/* app.use((err, req, res, _next) => {
  res.status(500).json({ message: `Algo deu errado! Mensagem: ${err.message}` });
}); */