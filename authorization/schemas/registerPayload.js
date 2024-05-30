const { roles } = require('../../config');

module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
  },
  required: [
    'username',
    'name',
    'lastname',
    'password',
  ],
  additionalProperties: false
};
