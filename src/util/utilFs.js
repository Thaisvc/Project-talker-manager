const fs = require('fs').promises;
const path = require('path');

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

module.exports = readFiles;