const {DataTypes} = require('sequelize');
const {roles} = require('../../config.js')

const Users ={
          id: {
              type: DataTypes.INTEGER(4),
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              comment: `The id of each user, self incrementing`,
          },
          username: {
            type: DataTypes.STRING(31),
            allowNull: false,
          },
          name: { 
              type: DataTypes.STRING(31),
              allowNull: false,
          },
          lastname: { 
              type: DataTypes.STRING(31),
              allowNull: false,
          },
          password: { 
            type: DataTypes.STRING(255),
            allowNull: false,
        },
          role: {
              type: DataTypes.STRING(10),
              allowNull: false,
              defaultValue: roles.USER,
              comment: `The overall role that users have. may be: admin, owner, backDev, FrontDev, reviewer, user, ...`
          },
      };
      
  module.exports = { 
        initialise: (sequelize) => {
          this.Users = sequelize.define("Users", Users);
        },
      
        createUser: (user) => {
          return this.Users.create(user);
        },
      
        findUser: (query) => {
          return this.Users.findOne({
            where: query,
          });
        },
      
        updateUser: (query, updatedValue) => {
          return this.Users.update(updatedValue, {
            where: query,
          });
        },
      
        findAllUsers: (query) => {
          return this.Users.findAll({
            where: query
          });
        },
      
        deleteUser: (query) => {
          return this.Users.destroy({
            where: query
          });
        }
}