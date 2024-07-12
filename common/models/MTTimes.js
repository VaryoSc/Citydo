const { DataTypes } = require("sequelize");

const MetroTimes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  hedavi: {
    type: DataTypes.INTEGER,
    comment: `The frequency that the station carts are being sent with`,
  },
  line: {
    type: DataTypes.INTEGER,
  },
  des: {
    type: DataTypes.INTEGER,
    comment: `The destination station line starting with 1 for the first destinatoin`,
  },
  weekday: {
    type: DataTypes.INTEGER,
    comment: `The day of the week, can be 4, 5 or 6`,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.MetroTimes = sequelize.define("MetroTimes", MetroTehran);
  },

  getHedavi: (query) => {
    return this.MetroTimes.findOne({
      where: query,
    });
  },

};
