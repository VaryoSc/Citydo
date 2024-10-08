const { DataTypes } = require("sequelize");

const MetroTehran = {
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
    type: DataTypes.STRING(10),
    comment: `Is the predefined line of the station`,
  },
  stationName: {
    type: DataTypes.STRING(35),
  },
  baseTime1: {
    type: DataTypes.INTEGER,
    comment: `The time it takes for the train to arrive to this station from the default start`,
  },
  baseTime2: {
    type: DataTypes.INTEGER,
    comment: `The time it takes for the train to arrive to this station from the secondary start`,
  },
  isMultiline: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: `If the station connects to two diffrent lines, here should be the station code of this station with the diffrent line`,
  },
  order_index: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.MetroTehran = sequelize.define("metrotehran", MetroTehran);
  },

  createStation: async (station) => {
    return this.MetroTehran.create(station);
  },

  findStation: async (query) => {
    return this.MetroTehran.findOne({
      where: query,
    });
  },

  updateStation: async (query, updatedValue) => {
    return this.MetroTehran.update(updatedValue, {
      where: query,
    });
  },

  findAllStation: async (query) => {
    return this.MetroTehran.findAll({
      where: query,
    });
  },

  deleteStation: async (query) => {
    return this.MetroTehran.destroy({
      where: query,
    });
  },
};
