const xlsx = require("xlsx");
/**
 * the main class of handeling future changes within the metro plannig system
 */
class TimeTableCTRL {
  constructor() {
    //Recives the file that should be placed by the requester
    const workBook = xlsx.readFile("times.xls");
    let baseTime = {
      1: [],
      2: [],
    };
    let hedavies = {};
    //The alphabet with their repeated version
    let Alpha = [
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "AA",
      "AB",
      "AC",
      "AD",
      "AE",
      "AF",
      "AG",
      "AH",
      "AI",
      "AJ",
      "AK",
      "AL",
      "AM",
      "AN",
      "AO",
      "AP",
      "AQ",
      "AR",
      "AS",
      "AT",
      "AU",
      "AV",
      "AW",
      "AX",
      "AY",
      "AZ",
      "BA",
      "BB",
      "BC",
      "BD",
      "BE",
      "BF",
      "BG",
      "BH",
      "BI",
      "BJ",
      "BK",
      "BL",
      "BM",
    ];
  }
  /**
   * Fills the hedavies of the Line
   * @param {String} column 
   * @param {Number} sheets 
   */
  getHedavies(column, sheets) {
    for (let i = 0; i < sheets; i++) {
      let line = i + 1;
      const sheetName = workBook.SheetNames[i];
      let sheet = workBook.Sheets[sheetName];
      hedavies[line] = [];
      for (let h = 6; h < 200; h++) {
        if (sheet[column + h] != undefined && parseInt(sheet[column + h].w))
          hedavies[line].push(sheet[column + h].w);
      }
    }
  }
  /**
   *  Give time in hour:minute and get results back or simply check your data to be in the correct format
   * @param {String} th time in hour:minute
   * @returns {Number} The given time in minutes format
   */
  thToMinute(th) {
    let hour = parseInt(th.split(":")[0]);
    let minute = parseInt(th.split(":")[1]);
    return hour * 60 + minute;
  }
  /**
   * Sets the basetimes in the "baseTime" let, recives the row which is best for extracting baseTimes
   * @param {Number} row 
   */
  getEntryTimes(row) {
    for (let i = 0; i < 2; i++) {
      const sheetName = workBook.SheetNames[i * 3];
      let sheet = workBook.Sheets[sheetName];
      for (let h = 0; h < Alpha.length; h++) {
        if (
          sheet[Alpha[h] + row] != undefined &&
          parseInt(thToMinute(sheet[Alpha[h] + row].w))
        ) {
          if (Object.keys(baseTime[i + 1]).length < 1) {
            firstTime = thToMinute(sheet[Alpha[h] + row].w);
            baseTime[i + 1][0] = firstTime;
            continue;
          }
          baseTime[i + 1].push(
            thToMinute(sheet[Alpha[h] + row].w) - baseTime[i + 1][0]
          );
        }
      }
      baseTime[i + 1][0] = 0;
    }
  }
  /**
   * Runs bot getHedavie and getBaseTime
   * @param {String} column 
   * @param {Number} row 
   * @param {Number} sheets 
   * @returns baseTimes and hedavie
   */
  getTimeTable(column, row, sheets) {
    h = getHedavies(column, sheets);
    b = getEntryTimes(row);
    return {
      basteTimes: b,
      hedavie: h,
    };
  }
}

module.exports = {
  initialize: () => {
    this.TimeTableCTRL = new TimeTableCTRL();
  },
  getTimeTable: (column, row, sheets) => {
    return this.getTimeTable(column, row, sheets);
  },
};
