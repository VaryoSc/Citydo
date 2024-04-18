const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('cityrodb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });
class MetroTehran extends Model{}
  MetroTehran.init(
      {
          stationCode: {
              type: DataTypes.INTEGER(4),
              allowNull: false,
              primaryKey: true,
              comment: `The code is made of 3 parts:
               1_One digit number defining the station's Line.
               2_One digit number telling if the station is a Destination or Start.
               3_Two digit number defining the station's number.`,
          },
          lineNumber: { 
              type: DataTypes.INTEGER,
              comment: `Is the predefined line of the station`,
          },
          stationName: { 
              type: DataTypes.STRING(35),
              
          },
          baseTime1: {
              type: DataTypes.INTEGER,
              comment: `The time it takes for the train to arrive to this station from the default start`
          },
          baseTime2: {
              type: DataTypes.INTEGER,
              comment: `The time it takes for the train to arrive to this station from the secondary start`
          },
          isMultiline:{
              type: DataTypes.INTEGER,
              defaultValue: 0,
              comment: `If the station connects to two diffrent lines, here should be the station code of this station with the diffrent line`
          },
      },
      {
          sequelize,
          tableName: 'MetroTehran',
      },
  );
  module.exports.MetroTehran = MetroTehran;