const { v4: uuidv4 } = require('uuid');

function generateCode() {
  return uuidv4().split('-')[0];
}

module.exports = generateCode;
