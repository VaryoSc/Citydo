/**
 * The base class for travel-time calculations
 */
class MasterTimer {
  constructor() {
    this.line1Wed = {
      taj: [40, 60, 330, 600, 850, 904, 960, 990],
      tajFre: [20, 10, 5, 6, 5, 6, 8, 10],
      kah: [252, 512, 777, 832, 880, 930, 990],
      kahFre: [5, 6, 5, 6, 9, 10, 15],
    };
    this.line1Thu = {
      taj: [40, 60, 230, 816, 940, 990],
      tajFre: [20, 10, 5, 6, 7, 10],
      kah: [212, 750, 880, 930, 990],
      kahFre: [5, 6, 7, 10, 15],
    };
    this.line1Fri = {
      taj: [40, 90, 950, 990],
      tajFre: [20, 10, 7, 10],
      kah: [30, 880, 930, 990],
      kahFre: [10, 7, 10, 15],
    };
  }
/**Will Calculate and return the arrival time of trains for the given stations
 * @param {Integer} startStation: the basetime1
 * @param {Integer} finalStation: the basetime2
 * @param {string} des: The first 3 letters of the line destination
 * @returns {array} An array containing the arriving time of the train on the first and seccond stations respectively
 */
  getWaitTime(startStation, finalStation, des) {
    const date = new Date();
    const weekday = date.getDay();
    const timeHour = date.getHours();
    const timeMinute = date.getMinutes();
    const timeCurrent = timeHour * 60 - 330 + timeMinute;
    let resStart, resFinal, ind;
    switch (weekday) {
      case 5:
        if (des == "taj")
        {
            ind = this.line1Fri.taj.findIndex((i) => i > timeCurrent);
            //The start of the train interval for this station
            resStart = startStation + (this.line1Fri.taj[ind-1] >= 0? this.line1Fri.taj[ind-1] :0);
            //Adds intervals to the station until you get the next arriving station
            while (resStart < timeCurrent){
                resStart += this.line1Fri.tajFre[ind];
            }
            resFinal = resStart + (finalStation - startStation);
            return [resStart, resFinal];
        }
        else{
            ind = this.line1Fri.kah.findIndex((i) => i > timeCurrent);
            //The start of the train interval for this station
            resStart = startStation + (this.line1Fri.kah[ind-1] >= 0? this.line1Fri.kah[ind-1] :0);
            //Adds intervals to the station until you get the next arriving station
            while (resStart < timeCurrent){
                resStart += this.line1Fri.kahFre[ind];
            }
            resFinal = resStart + (finalStation - startStation);
            return [resStart, resFinal];
        }
        return res;
        break;
      case 4:
        if (des == "taj")
        res = this.line1Thu.taj.find((i) => i > timeCurrent);
        else
        res = this.line1Thu.kah.find((i) => i > timeCurrent);
        return res;
        break;
      default:
        if (des == "taj")
        res = this.line1Wed.taj.find((i) => i > timeCurrent);
        else
        res = this.line1Wed.kah.find((i) => i > timeCurrent);
        return res;
        break;
    }
  }
}
const masterTimer = new MasterTimer();
result = masterTimer.getWaitTime(2, 7, "kah")
console.log(result[0] + " " + result[1]);
