/**
 * The base class for travel-time calculations
 */
class MasterWaiter {
  constructor() {
    this.line = {
      1: {
        Wed: {
          // Tajrish
          1: [330, 370, 390, 660, 930, 1180, 1234, 1290, 1320],
          Fre1: [20, 10, 5, 6, 5, 6, 8, 10],
          // Kahrizak
          2: [330, 582, 842, 1107, 1162, 1210, 1260, 1320],
          Fre2: [5, 6, 5, 6, 8, 10, 15],
        },
        Thu: {
          1: [330, 370, 390, 560, 1146, 1270, 1320],
          Fre1: [20, 10, 5, 6, 7, 10],
          2: [330, 542, 1080, 1210, 1260, 1320],
          Fre2: [5, 6, 7, 10, 15],
        },
        Fri: {
          1: [360, 400, 450, 1280, 1320],
          Fre1: [20, 10, 7, 10],
          2: [360, 390, 1210, 1260, 1320],
          Fre2: [10, 7, 10, 15],
        },
      },
      2: {
        Wed: {
          //sadeghieh
          1: [330, 350, 380, 590, 920, 1130, 1178, 1250, 1290, 1320],
          Fre2: [10, 6, 5, 6, 5, 6, 8, 10, 15],
          //farhangsara
          2: [330, 380, 415, 625, 955, 1180, 1208, 1280, 1320],
          Fre1: [10, 7, 5, 6, 5, 7, 8, 10],
        },
        Thu: {
          1: [330, 350, 380, 590, 1124, 1220, 1290, 1320],
          Fre2: [10, 6, 5, 6, 8, 10, 15],
          2: [330, 415, 625, 1180, 1220, 1320],
          Fre1: [10, 7, 5, 7, 8, 10],
        },
        Fri: {
          1: [360, 450, 1250, 1290, 1320],
          Fre1: [10, 7, 10, 15],
          2: [365, 455, 1250, 1320],
          Fre2: [10, 7, 10],
        },
      },
      3: {
        Wed: {
          //Azadegan
          1: [330, 420, 500, 588, 868, 910, 1140, 1170, 1198, 1270, 1320],
          Fre1: [7, 5, 7, 8, 7, 6, 7, 8, 10],
          //Ghaem
          2: [340, 360, 487, 567, 587, 899, 934, 994, 1160, 1208, 1320],
          Fre2: [10, 7, 5, 7, 8, 7, 6, 5, 6, 7],
        },
        Thu: {
          1: [330, 1230, 1290, 1320],
          Fre1: [10, 9, 10, 15],
          2: [340, 390, 1200, 1320],
          Fre2: [10, 9, 10],
        },
        Fri: {
          1: [360, 450, 1290, 1320],
          Fre1: [15, 12, 10, 15],
          2: [360, 456, 1290, 1320],
          Fre2: [12, 10, 15],
        },
      },
      4: {
        Wed: {
          //Alame
          1: [330, 370, 590, 950, 1170, 1188, 1220, 1320],
          Fre1: [6, 5, 6, 5, 6, 8, 10],
          //Kolahdooz
          2: [330, 540, 900, 1140, 1188, 1220, 1320],
          Fre2: [5, 6, 5, 6, 8, 10],
        },
        Thu: {
          1: [330, 350, 380, 553, 1165, 1190, 1290, 1320],
          Fre1: [10, 8, 5, 6, 8, 10, 15],
          2: [330, 510, 1116, 1180, 1320],
          Fre2: [5, 6, 8, 10],
        },
        Fri: {
          1: [360, 450, 1200, 1290, 1320],
          Fre1: [10, 7, 10, 15],
          2: [360, 400, 1180, 1260, 1320],
          Fre2: [10, 7, 10, 15],
        },
      },
      5: {
        Wed: {
          //Sadeghieh
          1: [330, 360, 380, 570, 870, 1200, 1260, 1320],
          Fre2: [30, 20, 10, 15, 10, 15, 20],
          //Golshahr
          2: [330, 540, 795, 1085, 1200, 1260, 1320],
          Fre1: [10, 15, 10, 15, 20, 30],
        },
        Thu: {
          1: [330, 360, 380, 570, 840, 1140, 1200, 1320],
          Fre2: [30, 20, 10, 15, 10, 15, 20],
          2: [320, 540, 765, 1065, 1140, 1260, 1320],
          Fre1: [10, 15, 10, 15, 20, 30],
        },
        Fri: {
          1: [375, 975, 1230, 1320],
          Fre1: [30, 20, 30],
          2: [360, 975, 1200, 1320],
          Fre2: [30, 20, 30],
        },
      },
      6: {
        Wed: {
          //Arman
          1: [330, 360, 610, 904, 1185, 1320],
          Fre1: [15, 12.5, 14, 11.5, 15],
          //Dolat-Abad
          2: [330, 360, 560, 910, 1190, 1280, 1320],
          Fre2: [15, 12.5, 14, 11.5, 15, 20],
        },
        Thu: {
          1: [330, 360, 610, 904, 1185, 1320],
          Fre1: [15, 12.5, 14, 11.5, 15],
          2: [330, 360, 560, 910, 1190, 1280, 1320],
          Fre2: [15, 12.5, 14, 11.5, 15, 20],
        },
        Fri: {
          1: [360, 1260, 1320],
          Fre1: [16, 20],
          2: [360, 1260, 1320],
          Fre2: [16, 20],
        },
      },
      7: {
        Wed: {
          //Ketab
          1: [330, 600, 900, 1200, 1320],
          Fre1: [11.5, 15, 11.5, 15],
          //Basij
          2: [335, 592, 892, 1192, 1320],
          Fre2: [11.5, 15, 11.5, 15],
        },
        Thu: {
          1: [330, 600, 900, 1200, 1320],
          Fre1: [11.5, 15, 11.5, 15],
          2: [335, 592, 892, 1192, 1320],
          Fre2: [11.5, 15, 11.5, 15],
        },
        Fri: {
          1: [360, 1320],
          Fre1: [15],
          2: [367, 1327],
          Fre2: [15],
        },
      },
      e1: {
        Wed: {
          //Parand
          1: [390, 1110],
          Fre1: [120],
          //Shahed
          2: [330, 1050],
          Fre2: [120],
        },
        Thu: {
          1: [390, 1110],
          Fre1: [120],
          2: [330, 1050],
          Fre2: [120],
        },
        Fri: {
          1: [390, 1110],
          Fre1: [120],
          2: [330, 1050],
          Fre2: [120],
        },
      },
      e4: {
        Wed: {
          //Bimeh
          1: [337, 1312],
          Fre1: [15],
          //Mehraabad
          2: [345, 1320],
          Fre2: [15],
        },
        Thu: {
          1: [337, 1312],
          Fre1: [15],
          2: [345, 1320],
          Fre2: [15],
        },
        Fri: {
          1: [367, 1312],
          Fre1: [15],
          2: [375, 1320],
          Fre2: [15],
        },
      },
      e5: {
        Wed: {
          //Hashtgard
          1: [360, 1095],
          Fre1: [90],
          //Ensheaab Golshahr
          2: [320, 1050],
          Fre2: [90],
        },
        Thu: {
          1: [320, 1050],
          Fre1: [90],
          2: [360, 1095],
          Fre2: [90],
        },
        Fri: {
          1: [410, 1050],
          Fre1: [90],
          2: [450, 1095],
          Fre2: [90],
        },
      },
      exp5: {
        //Sadeghieh-Express
        1: [900, 1200],
        Fre1: [20],
        //Golshahr-Express
        2: [320, 540],
        Fre2: [20],
      },
    };
  }
  /**Will Calculate and return the arrival times for the given station
   * @param {Number} lineNumber: The line for both stations
   * @param {Number} startStation: the basetime of the starting station
   * @param {String} des: The first 3 letters of the line destination
   * @returns {Array} An array containing the arriving time of the train on the first and seccond stations respectively
   */

  getEntryTime(lineNumber, startStation_, des) {
    const date = new Date();
    const weekday = date.getDay();
    const timeHour = date.getHours();
    const timeMinute = date.getMinutes();
    let timeCurrent = timeHour * 60 + timeMinute;
    let result = [],
      startStation = parseInt(startStation_),
      baseTimeObject = this.line[lineNumber].Wed[des],
      timeFrequencyObject = this.line[lineNumber].Wed["Fre" + des];
    timeCurrent -= startStation;
    try{
    if (weekday == 5) {
      (baseTimeObject = this.line[lineNumber].Fri[des]),
        (timeFrequencyObject = this.line[lineNumber].Fri["Fre" + des]);
    } else if (weekday == 4) {
      (baseTimeObject = this.line[lineNumber].Thu[des]),
        (timeFrequencyObject = this.line[lineNumber].Thu["Fre" + des]);
    }
  }
  catch(error){
    throw new Error(`Station does not operate today --- ${error}`)
  }
    let ind = baseTimeObject.findIndex((i) => i > timeCurrent);
    for (let index = 0; index < 5; index++) {
      ind = baseTimeObject.findIndex(
        (i) => i > timeCurrent + index * timeFrequencyObject[ind - 1]
      );
      if (
        baseTimeObject.findIndex(
          (i) => i < timeCurrent + index * timeFrequencyObject[ind - 1]
        ) ||
        !baseTimeObject.findIndex(
          (i) => i > timeCurrent + index * timeFrequencyObject[ind - 1]
        )
      ) {
        return result;
      }
      //The start of the train interval for this station
      result[index] =
        baseTimeObject[ind - 1] >= 0 ? baseTimeObject[ind - 1] : 0;
      //Adds intervals in order, to the station until you get the next arriving station
      while (
        result[index] <
        timeCurrent + index * timeFrequencyObject[ind - 1]
      ) {
        result[index] += timeFrequencyObject[ind - 1];
      }
      result[index] += startStation;
    }
    return result;
  }

  /**Will Calculate and return the arrival time of trains for the given stations
   * @param {Number} lineNumber: The line for both stations
   * @param {Number} startStation: the basetime of the starting station
   * @param {Number} finalStation: the basetime of the final station
   * @param {string} des: The first 3 letters of the line destination
   * @returns {Array} An array containing the arriving time of the train on the first and seccond stations respectively
   */

  getWaitTime(lineNumber, startStation_, finalStation_, des) {
    let resStart = [],
      resFinal = [],
      startStation = parseInt(startStation_),
      finalStation = parseInt(finalStation_);
      resStart = this.getEntryTime(lineNumber, startStation, des);
    for (let index = 0; index < 5; index++) {
      resFinal[index] = resStart[index] + (finalStation - startStation);
    }
    return [resStart, resFinal];
  }
}

module.exports = {
  initialise: () => {
    this.MasterWaiter = new MasterWaiter();
  },
  getEntryTime: (lineNumber, baseTime1, baseTime2) => {
    return {
      1: this.MasterWaiter.getEntryTime(lineNumber, baseTime1, 1),
      2: this.MasterWaiter.getEntryTime(lineNumber, baseTime2, 2),
    };
  },
  getWaitTime: (lineNumber, startStation, finalStationstation, des) => {
    return this.MasterWaiter.getWaitTime(
      lineNumber,
      startStation,
      finalStationstation,
      des
    );
  },
};
