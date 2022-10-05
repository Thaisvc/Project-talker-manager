/* eslint-disable no-useless-escape */
const fs = require('fs').promises;
const path = require('path');
const randtoken = require('rand-token');
const Joi = require('joi');
// https://joi.dev/api/?v=17.6.1

const FILE_JSON_DATA = '../talker.json';

async function readFiles() {
  const filePath = path.resolve(__dirname, FILE_JSON_DATA);
  console.log(filePath);
  try {
    const data = await fs.readFile(filePath);
    const list = JSON.parse(data);
    return list;
  } catch (error) {
    console.error(`Error : ${error}`);
  }
}

function createRandomToken() {
  return randtoken.generate(16);
}

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'met'] } }).required(),
  
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'O campo {{#label}} é obrigatório',
  'string.empty': 'O campo {{#label}} é obrigatório',
  'string.email': 'O {{#label}} deve ter o formato \"email@email.com\"',
  'string.min': 'O {{#label}} deve ter pelo menos 6 caracteres',

});

async function validations(user) {
const { error } = await schema.validate(user);
const err = { message: error.details[0].message };
const { message } = err;
if (error) throw new Error(message);
// lint nao aceita if (error) throw ({ message: error.details[0].message });
}

module.exports = { readFiles, createRandomToken, validations };
