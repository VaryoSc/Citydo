const Sequelize = require("sequelize");
const {MetroTehran} = require("./Models.js");

const sequelize = new Sequelize("cityrodb", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  port: 3306,
});

/**The main class for the database connection related stuff.
*@param address: String The address for the databse. localhost or ip.
*@param port: Integer The port number of the dabase address.
   */
class dbConnect {
  address;
  port
  constructor(address, port) {
    this.address = address;
    this.port = port;
  }
  async checkConnect() {
    try {
      await sequelize.authenticate();
      console.log("Connected successfully!");
    } catch (error) {
      console.error("Unable to connect to the database: ", error);
    }
    sequelize.close();
  }
}
/* class dbCheckConnect extends dbConnect{
Here is waht is meant to be the class for checking connection for better seperation of the classes
    
}*/
/**The main class for controling of the database items.
*@param address: String The address for the databse. localhost or ip.
*@param port: Integer The port number of the dabase address.
   */
class MetroTehranManager extends dbConnect {
  async appendModel() {
    try {
      await MetroTehran.sync({ alter: true });
      console.log("Model was stablished successfully");
    } catch (error) {
      console.error(`Failed to stablish Model: ${error}`);
    }
  }
  /**Will create an instance or update a currently existing one
   *@param stationCode: definig the 4 digit code for each station
   *@param lineNumber: classifing the station to a line(Multiline Stations may have two Lines)
   *@param stationName: String(utf8_persian_ci)
   *@param baseTimes 1 and 2: the length of time is calculated from the first and second starting stations
   *@param isMultiline: Insert the other code for this station if available
   *@returns will return the staton's code as confirmation
   */
  async appendInstance(
    stationCode,
    lineNumber,
    stationName,
    baseTime1,
    baseTime2,
    isMultiline
  ) {
    try {
      const instance = await MetroTehran.create({
        stationCode: stationCode,
        lineNumber: lineNumber,
        stationName: stationName,
        baseTime1: baseTime1,
        baseTime2: baseTime2,
        isMultiline: isMultiline,
      });
      return stationCode;
    } catch (e) {
      console.error(`Failed to append the requested instance: ${e}`);
    }
  }
  /**Will Update the instance if available based on the Stationcode
   *@param stationCode
   *@param lineNumber
   *@param stationName: String(utf8_persian_ci)
   *@param baseTime1 
   @param baseTime2 
   *@param isMultiline 
   *@returns will return the staton's code as confirmation
   */
  async updateInstance(
    stationCode,
    lineNumber,
    stationName,
    baseTime1,
    baseTime2,
    isMultiline
  ) {
    try {
      const instance = await MetroTehran.update(
        {
          stationCode: stationCode,
          lineNumber: lineNumber,
          stationName: stationName,
          baseTime1: baseTime1,
          baseTime2: baseTime2,
          isMultiline: isMultiline,
        },
        {
          where: {
            stationCode: stationCode,
          },
        }
      );
      return stationCode;
    } catch (e) {
      console.error(`Failed to update the requested instance: ${e}`);
    }
  }
  /**Will Delete the instance if available. searches with the Stationcode
   *@param stationCode
   */
  async deleteInstance(stationCode) {
    try {
      const instance = await MetroTehran.destroy({
        where: {
          stationCode: stationCode,
        },
      });
      return "Success";
    } catch (e) {
      console.error(`Failed to update the requested instance: ${e}`);
    }
  }
}

const metroTehranManager = new MetroTehranManager("127.0.0.1", 3306);
console.log(metroTehranManager.updateInstance(1101, 1, "تجریش", 0, 102, 0));
