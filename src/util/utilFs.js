const fs = require('fs').promises;
const path = require('path');
// const { join } = require('path');
const randtoken = require('rand-token');
const Joi = require('joi');
// https://joi.dev/api/?v=17.6.1
const SCHEMA = 'O campo {{#label}} é obrigatório';
const FILE_JSON_DATA = '../talker.json';

async function readFiles() {
  const filePath = path.resolve(__dirname, FILE_JSON_DATA);
  try {
    const data = await fs.readFile(filePath);
    const list = JSON.parse(data);
    return list;
  } catch (error) {
    console.error(`Error : ${error}`);
  }
}

async function writeFiles(file) {
  try {
    const fileWrit = await readFiles();

    const allFile = JSON.stringify([...fileWrit, file]);

    await fs.writeFile(path.resolve(__dirname, FILE_JSON_DATA), allFile);
  } catch (error) {
    console.error(`Erro na escrita do arquivo: ${error}`);
  }
}

function createRandomToken() {
  return randtoken.generate(16);
}

const schema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'any.required': SCHEMA,
    'string.min': 'O {{#label}} deve ter pelo menos 6 caracteres',
    'string.empty': SCHEMA,
  }),

  email: Joi.string().required().email().lowercase()
  .messages({
      'any.required': SCHEMA,
      'string.email': 'O {{#label}} deve ter o formato "email@email.com"',
      'string.empty': SCHEMA,
    }),
});

const schemaPeople = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().integer().min(18).required()
    .messages({
      'any.string': SCHEMA,
      'number,empty': SCHEMA,
      'number.min': 'A pessoa palestrante deve ser maior de idade',
      'number.base': SCHEMA,
    }),
  talk: Joi.object().required()
    .keys({
      watchedAt: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
        'any.required': 'O campo "watchedAt" é obrigatório',
        'string.empty': 'O campo "watchedAt" é obrigatório',

        'string.pattern.base': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      }),
      rate: Joi.number().required().min(1).max(5)
        .messages({
          'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
          'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
          'any.required': 'O campo "rate" é obrigatório',
          'string.required': 'O campo "rate" é obrigatório',
        }),
    }),

}).messages({
  'any.required': SCHEMA,
  'string.empty': SCHEMA,
  'string.min': 'O {{#label}} deve ter pelo menos 3 caracteres',
  'number.max': 'O campo {{#label}} deve ser um inteiro de 1 à 5',
  'number.min': 'O campo {{#label}} deve ser um inteiro de 1 à 5',
  'string.pattern.base': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
});

/* const validations = async (product) => {
 
  if (error) {
    throw { message: error.details[0].message, status: 400 };
  }
}; */

/* const validationUser = async (user) => {
  
  if (error) {
    throw { message: error.details[0].message, status: 400 };
  }
}; */

/* REQ 5
 const createPeople = async (objPeople) => {
  const { name, age, talk } = objPeople;
  const { watchedAt, rate } = talk;
  const data = await readFiles();
  const info = { name, age, id: data.length + 1, talk: { watchedAt, rate } };
  console.log(info);
  await writeFiles(info);
  return info;
}; */
module.exports = {
  readFiles,
  createRandomToken,
  schema,
  schemaPeople,
  writeFiles,

};
