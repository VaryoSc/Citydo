const { roles } = require('../../config');

module.exports = {
  type: 'object',
  properties: {
    role: {
      type: 'string',
      enum: Object.values(roles)
    },
    id: {
      type: 'string',
    }
  },
  additionalProperties: false
};
