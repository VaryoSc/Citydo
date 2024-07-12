
const fs = require('fs'),
 { Sequelize } = require("sequelize");
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
    sequelize: new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, fs.readFileSync(process.env.POSTGRES_PASSWORD_FILE, 'utf8'), {
      host: process.env.POSTGRES_HOST,
      dialect: process.env.DIALECT,
      logging: process.env.BUILD_TARGET == 'dev' ? console.log() : false,
      port: process.env.DB_PORT,
      dialectOptions: {
        charset: 'utf8mb4',
      },
    }),
  }
