const { Sequelize } = require("sequelize");
require('dotenv').config()
const red = process.env.PORT
module.exports = {
    jwtSecret: process.env.JWTSECRET,
    port: process.env.PORT || 3000,
    jwtExpirationInSeconds: process.env.JWT_EXPIRATION_IN_SECCONDS,
    roles: {
      USER: 'user',
      ADMIN: 'admin',
      OWNER: 'owner',
      
    },
    sequelize: new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
      logging: false,
      dialectOptions: {
        charset: 'utf8mb4',
      },
    }),
  }
