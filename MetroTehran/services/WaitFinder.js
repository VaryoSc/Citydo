const MetroTehran = require('../../common/models/MetroTehran.js'),
    { Op } = require('sequelize');

/**
 * The base class for travel-time calculations
 */
class MasterWaiter {
    line = {};
    constructor() {
        this.line = {
            1: {
                Wed: {
                    // Tajrish
                    1: [330, 370, 390, 660, 930, 1180, 1234, 1290, 1320],
                    Fre1: [20, 10, 5, 6, 5, 6, 8, 10],
                    // Kahrizak
                    2: [360, 582, 842, 1107, 1162, 1210, 1260, 1320],
                    Fre2: [5, 6, 5, 6, 8, 10, 15],
                },
                Thu: {
                    1: [330, 370, 390, 560, 1146, 1270, 1320],
                    Fre1: [20, 10, 5, 6, 7, 10],
                    2: [360, 542, 1080, 1210, 1260, 1320],
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
                    //farhangsara
                    1: [330, 380, 415, 625, 955, 1180, 1208, 1280, 1320],
                    Fre1: [10, 7, 5, 6, 5, 7, 8, 10],
                    //sadeghieh
                    2: [330, 350, 380, 590, 920, 1130, 1178, 1250, 1290, 1320],
                    Fre2: [10, 6, 5, 6, 5, 6, 8, 10, 15],
                },
                Thu: {
                    1: [330, 415, 625, 1180, 1220, 1320],
                    Fre1: [10, 7, 5, 7, 8, 10],
                    2: [330, 350, 380, 590, 1124, 1220, 1290, 1320],
                    Fre2: [10, 6, 5, 6, 8, 10, 15],
                },
                Fri: {
                    1: [365, 455, 1250, 1320],
                    Fre1: [10, 7, 10],
                    2: [360, 450, 1250, 1290, 1320],
                    Fre2: [10, 7, 10, 15],
                },
            },
            3: {
                Wed: {
                    //Ghaem
                    1: [
                        340, 360, 487, 567, 587, 899, 934, 994, 1160, 1208,
                        1320,
                    ],
                    Fre1: [10, 7, 5, 7, 8, 7, 6, 5, 6, 7],
                    //Azadegan
                    2: [
                        330, 420, 500, 588, 868, 910, 1140, 1170, 1198, 1270,
                        1320,
                    ],
                    Fre2: [7, 5, 7, 8, 7, 6, 7, 8, 10],
                },
                Thu: {
                    1: [340, 390, 1200, 1320],
                    Fre1: [10, 9, 10],
                    2: [330, 1230, 1290, 1320],
                    Fre2: [10, 9, 10, 15],
                },
                Fri: {
                    1: [360, 456, 1290, 1320],
                    Fre1: [12, 10, 15],
                    2: [360, 450, 1290, 1320],
                    Fre2: [15, 12, 10, 15],
                },
            },
            4: {
                Wed: {
                    //Kolahdooz
                    1: [330, 540, 900, 1140, 1188, 1220, 1320],
                    Fre1: [5, 6, 5, 6, 8, 10],
                    //Alame
                    2: [330, 370, 590, 950, 1170, 1188, 1220, 1320],
                    Fre2: [6, 5, 6, 5, 6, 8, 10],
                },
                Thu: {
                    1: [330, 510, 1116, 1180, 1320],
                    Fre1: [5, 6, 8, 10],
                    2: [330, 350, 380, 553, 1165, 1190, 1290, 1320],
                    Fre2: [10, 8, 5, 6, 8, 10, 15],
                },
                Fri: {
                    1: [360, 400, 1180, 1260, 1320],
                    Fre1: [10, 7, 10, 15],
                    2: [360, 450, 1200, 1290, 1320],
                    Fre2: [10, 7, 10, 15],
                },
            },
            5: {
                Wed: {
                    //Sadeghieh
                    1: [330, 360, 380, 570, 870, 1200, 1260, 1320],
                    Fre1: [30, 20, 10, 15, 10, 15, 20],
                    //Golshahr
                    2: [330, 540, 795, 1085, 1200, 1260, 1320],
                    Fre2: [10, 15, 10, 15, 20, 30],
                },
                Thu: {
                    1: [330, 360, 380, 570, 840, 1140, 1200, 1320],
                    Fre1: [30, 20, 10, 15, 10, 15, 20],
                    2: [320, 540, 765, 1065, 1140, 1260, 1320],
                    Fre2: [10, 15, 10, 15, 20, 30],
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
                    //Dolat-Abad
                    1: [330, 360, 560, 910, 1190, 1280, 1320],
                    Fre1: [15, 12.5, 14, 11.5, 15, 20],
                    //Arman
                    2: [330, 360, 610, 904, 1185, 1320],
                    Fre2: [15, 12.5, 14, 11.5, 15],
                },
                Thu: {
                    1: [330, 360, 560, 910, 1190, 1280, 1320],
                    Fre1: [15, 12.5, 14, 11.5, 15, 20],
                    2: [330, 360, 610, 904, 1185, 1320],
                    Fre2: [15, 12.5, 14, 11.5, 15],
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
                    //Basij
                    1: [335, 592, 892, 1192, 1320],
                    Fre1: [11.5, 15, 11.5, 15],
                    //Ketab
                    2: [330, 600, 900, 1200, 1320],
                    Fre2: [11.5, 15, 11.5, 15],
                },
                Thu: {
                    1: [335, 592, 892, 1192, 1320],
                    Fre1: [11.5, 15, 11.5, 15],
                    2: [330, 600, 900, 1200, 1320],
                    Fre2: [11.5, 15, 11.5, 15],
                },
                Fri: {
                    1: [367, 1327],
                    Fre1: [15],
                    2: [360, 1320],
                    Fre2: [15],
                },
            },
            e1: {
                Wed: {
                    //Shahed
                    1: [330, 1050],
                    Fre1: [120],
                    //Parand
                    2: [390, 1110],
                    Fre2: [120],
                },
                Thu: {
                    1: [330, 1050],
                    Fre1: [120],
                    2: [390, 1110],
                    Fre2: [120],
                },
                Fri: {
                    1: [330, 1050],
                    Fre1: [120],
                    2: [390, 1110],
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
                    //Ensheaab Golshahr
                    1: [320, 1050],
                    Fre1: [90],
                    //Hashtgard
                    2: [360, 1095],
                    Fre2: [90],
                },
                Thu: {
                    1: [360, 1095],
                    Fre1: [90],
                    2: [320, 1050],
                    Fre2: [90],
                },
                Fri: {
                    1: [450, 1095],
                    Fre1: [90],
                    2: [410, 1050],
                    Fre2: [90],
                },
            },
            exp5: {
                Wed: {
                //Golshahr-Express
                1: [320, 540],
                Fre1: [20],
                //Sadeghieh-Express
                2: [900, 1200],
                Fre2: [20],
            },
            Thu: {
                //Golshahr-Express
                1: [320, 540],
                Fre1: [20],
                //Sadeghieh-Express
                2: [900, 1200],
                Fre2: [20],
            },
            Fri: {
                //Golshahr-Express
                1: [320, 540],
                Fre1: [20],
                //Sadeghieh-Express
                2: [900, 1200],
                Fre2: [20],
            },
        },
        };
    }
    /**Will Calculate and return the arrival times for the given station
     * @param {Number} lineNumber: The line for both stations
     * @param {Number} startStation: the basetime of the starting station
     * @param {String} des: The line's destination
     * @returns {Array} An array containing the arriving time of the train on the first and seccond stations respectively
     */

    getEntryTime(lineNumber, startStation, des, timeCurrent = 0, count = 5) {
        const date = new Date(),
            weekday = date.getDay();

        if (timeCurrent == 0) {
            const timeHour = date.getHours();
            const timeMinute = date.getMinutes();
            timeCurrent = timeHour * 60 + timeMinute;
        }

        let result = [],
            baseTimeObject = [],
            timeFrequencyObject = [];
        timeCurrent -= startStation;
        try {
            (baseTimeObject = this.line[lineNumber].Wed[des]),
                (timeFrequencyObject = this.line[lineNumber].Wed['Fre' + des]);
            if (weekday == 5) {
                (baseTimeObject = this.line[lineNumber].Fri[des]),
                    (timeFrequencyObject =
                        this.line[lineNumber].Fri['Fre' + des]);
            } else if (weekday == 4) {
                (baseTimeObject = this.line[lineNumber].Thu[des]),
                    (timeFrequencyObject =
                        this.line[lineNumber].Thu['Fre' + des]);
            }
        } catch (error) {
            return result;
        }
        let ind = baseTimeObject.findIndex((i) => i > timeCurrent);
        for (let index = 0; index < count; index++) {
            ind = baseTimeObject.findIndex(
                (i) => i > timeCurrent + index * timeFrequencyObject[ind - 1],
            );
            if (
                baseTimeObject.findIndex(
                    (i) =>
                        i < timeCurrent + index * timeFrequencyObject[ind - 1],
                ) ||
                !baseTimeObject.findIndex(
                    (i) =>
                        i > timeCurrent + index * timeFrequencyObject[ind - 1],
                )
            ) {
                return result;
            }
            //The start of the train interval for this station
            result[index] =
                baseTimeObject[ind - 1] >= 330 ? baseTimeObject[ind - 1] : 330;
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
     * @param {number} lineNumber: The line for both stations
     * @param {number} startStation_: the basetime of the starting station
     * @param {number} finalStation_: the basetime of the final station
     * @param {string} des: The line's destination
     * @param {number} timeCurrent: Optional, The time for the calculation to begin at
     * @param {number} [count=5]: Optional, number of desired times
     * @returns {Array} An array containing the arriving time of the train on the first and seccond stations respectively
     */

    getWaitTime(
        lineNumber,
        startStation_,
        finalStation_,
        des,
        timeCurrent = 0,
        count = 5,
    ) {
        let resStart = [],
            resFinal = [],
            startStation = parseInt(startStation_),
            finalStation = parseInt(finalStation_);
        resStart = this.getEntryTime(
            lineNumber,
            startStation,
            des,
            timeCurrent,
            count,
        );
        for (let index = 0; index < count; index++) {
            resFinal[index] = resStart[index] + (finalStation - startStation);
        }
        return [resStart, resFinal];
    }
    /**
     * A function made primaraly for more readability on getMultiStation
     * @param {object} middle
     * @param {object} desStation
     * @param {number} tMiddle
     * @param {boolean} shouldCut
     * @returns {object?number?} The first arrival time of the two given stations
     * | or the isMultiline Counterpart of the first station and it's arrival time to desStation
     */
    async getCutStation(middle, desStation, tMiddle, shouldCut = true) {
        if (shouldCut) {
            await MetroTehran.findStation({
                stationCode: middle.isMultiline,
            })
                .then((station) => {
                    middle = station.dataValues;
                })
                .catch((err) => {
                    console.error(
                        `getCutStation: Failed to get the Cut's info ${err}`,
                    );
                });
        }
        let des = (desStation.stationCode % 100) > (middle.stationCode % 100) ? 1 : 2;
        if (shouldCut) {
            return {
                time: this.getWaitTime(
                    middle.lineNumber,
                    middle[des == 1 ? 'baseTime1' : 'baseTime2'],
                    desStation[des == 1 ? 'baseTime1' : 'baseTime2'],
                    des,
                    tMiddle,
                    1,
                )[1][0],
                cut: middle,
            };
        }
        return this.getWaitTime(
            middle.lineNumber,
            middle[des == 1 ? 'baseTime1' : 'baseTime2'],
            desStation[des == 1 ? 'baseTime1' : 'baseTime2'],
            des,
            tMiddle,
            1,
        )[1][0];
    }
    /**
     * Will calculate and give the best possible route for traveling accross lines
     * @param {number} startStation_ The stationCode of our starting station
     * @param {number} finalStation_ The stationCode of our destination station
     * @param {number} [timeCurrent=0] Optional, the starting time of our travel
     * @param {number} [count=5] Optional, the number of results we want
     * @returns route: stationCode of stations we will be trevelling from |
     * times: Times of arrival for each travel in the "route"
     */
    async getMultiRoute(startStation_, finalStation_, timeCurrent = 0) {
        let startStation,
            finalStation,
            res = {
                isMulti: {},
                times: [],
                route: [],
            };
        if (!timeCurrent) {
            let date = new Date(),
                timeHour = date.getHours(),
                timeMinute = date.getMinutes();
            timeCurrent = timeHour * 60 + timeMinute;
        } else {
            timeCurrent = parseInt(timeCurrent);
        }
        //Geting the stations info from database
        await MetroTehran.findStation({
            stationCode: parseInt(startStation_),
        })
            .then((station) => {
                startStation = station.dataValues;
            })
            .catch((err) => {
                console.error(`Failed to retrive the starting Station: ${err}`);
            });
        await MetroTehran.findStation({
            stationCode: parseInt(finalStation_),
        })
            .then((station) => {
                finalStation = station.dataValues;
            })
            .catch((err) => {
                console.log(`Failed to retrive the final Station: ${err}`);
            });
        let startLine = startStation.lineNumber,
            finalLine = finalStation.lineNumber;
        //checking if there is any need for multiline traveling
        if (startLine === finalLine) {
            res['isMulti'][0] = false;
            res[1] = await this.getCutStation(
                startStation,
                finalStation,
                timeCurrent,
            );
            return res;
        }
        //From here we check to make sure the startStation and or the finalStation are not Endheaabs
        if (!(parseInt(startLine) || parseInt(finalLine))) {
            let middle, tEnsheaab, ensheRes, eCut1;
            if (!parseInt(startLine)) {
                const queryEnsheaab = {
                    [Op.and]: [
                        { isMultiline: { [Op.gt]: 5 } },
                        {
                            lineNumber: startLine,
                        },
                    ],
                };
                await MetroTehran.findStation(queryEnsheaab)
                    .then(async (station) => {
                        //checking if we can just use the other entry for this station
                        if (startStation == station.dataValues) {
                            res = await this.getMultiRoute(
                                startStation.isMultiline,
                                finalStation,
                            );
                            return {
                                times: res['times'],
                                route: res['route'],
                            };
                        } else {
                            middle = station.dataValues;
                            (tEnsheaab = await this.getCutStation(
                                startStation,
                                middle,
                                timeCurrent,
                                false,
                            )),
                                (res['route'] = [
                                    startStation.stationCode,
                                    middle.stationCode,
                                ]);
                            res['times'] = [timeCurrent, tEnsheaab];
                        }
                    })
                    .catch((err) => {
                        console.log(
                            `Failed to retrive the starting Station's multiline counterpart: ${err}`,
                        );
                    });
                if (parseInt(finalLine)) {
                    ensheRes = await this.getMultiRoute(
                        middle.isMultiline,
                        finalStation,
                        tEnsheaab + 5,
                    );
                    res['route'].push(ensheRes['route']);
                    res['times'].push(ensheRes['times']);
                    return {
                        times: res['times'],
                        route: res['route'],
                    };
                } else {
                    eCut1 = middle.isMultiline;
                }
            }
            if (!parseInt(finalLine)) {
                const queryEnsheaab = {
                    [Op.and]: [
                        { isMultiline: { [Op.gt]: 5 } },
                        {
                            lineNumber: finalLine,
                        },
                    ],
                };
                await MetroTehran.findStation(queryEnsheaab)
                    .then(async (station) => {
                        //Checking if we can just use the other entry for this station
                        if (
                            finalStation.stationCode ==
                            station.dataValues.stationCode
                        ) {
                            tmpRes = await this.getMultiRoute(
                                startStation,
                                finalStation.isMultiline,
                            );
                            res['route'].push[tmpRes['route']];
                            res['times'].push[tmpRes['times']];
                            return {
                                times: res['times'],
                                route: res['route'],
                            };
                        } else {
                            middle = station.dataValues;
                        }
                    })
                    .catch((err) => {
                        console.error(
                            `Failed to retrive the starting Station's multiline counterpart: ${err}`,
                        );
                    });
                if (parseInt(startLine)) {
                    ensheRes = await this.getMultiRoute(
                        startStation,
                        middle.isMultiline,
                    );
                    res = ensheRes;
                } else {
                    ensheRes = await this.getMultiRoute(
                        eCut1,
                        middle.isMultiline,
                        parseInt(res['times'][1]) + 5,
                    );
                    res['route'] = res['route'].concat(ensheRes['route']);
                    res['times'] = res['times'].concat(ensheRes['times']);
                }
                let finalTime = await this.getCutStation(
                    middle,
                    finalStation,
                    res['times'][res['times'].length - 1] + 5,
                    false,
                );
                res['route'].push(middle.stationCode, finalStation.stationCode);
                res['times'].push(
                    res['times'][res['times'].length - 1] + 5,
                    finalTime,
                );
                return {
                    times: res['times'],
                    route: res['route'],
                };
            }
        }
        //Now we go to do the required actions for normal, not Ensheaab, travel
        const queryMulti = {
            [Op.and]: [
                { isMultiline: { [Op.gt]: 1 } },
                {
                    lineNumber: startLine,
                },
            ],
        };
        //Getting everu isMultiline true station
        let startSts;
        await MetroTehran.findAllStation(queryMulti)
            .then(async (station) => {
                startSts = [];
                station.forEach((model) => {
                    startSts.push(model.dataValues);
                });
            })
            .catch(() => {
                startSts = null;
            });
        //Checking all possible routes
        for (let index = 0; index < startSts.length; index++) {
            const e = startSts[index];
            if (parseInt(e.isMultiline / 1000) == finalLine) {
                res[index + 1] = [];
                res[index + 1].push(timeCurrent);
                let tMiddle = await this.getCutStation(
                        startStation,
                        e,
                        timeCurrent,
                        false,
                    ),
                    //Turning e to c(e) and getting the travel time
                    tmpCut = await this.getCutStation(
                        e,
                        finalStation,
                        tMiddle + 5,
                    ),
                    middle = tmpCut.cut;
                res[index + 1].push(tMiddle);
                //The station travels in their respecitve pairs ("route" for this travel)
                res.isMulti[index + 1] = [
                    parseInt(startStation_),
                    e.stationCode,
                    middle.stationCode,
                    parseInt(finalStation_),
                ];
                //The arrival times of each pair ("times" for this travel)
                res[index + 1].push(tmpCut.time);
                continue;
            }
            const queryMultiF = {
                [Op.and]: [
                    {
                        isMultiline: {
                            [Op.between]: [
                                finalLine * 1000,
                                finalLine * 1000 + 999,
                            ],
                        },
                    },
                    {
                        stationCode: {
                            [Op.between]: [
                                parseInt(e.isMultiline / 1000) * 1000,
                                parseInt(e.isMultiline / 1000) * 1000 + 999,
                            ],
                        },
                    },
                ],
            };
            let nxtSts;
            await MetroTehran.findStation(queryMultiF)
                .then((station) => {
                    nxtSts = station.dataValues;
                })
                .catch(() => {
                    nxtSts = false;
                });
            if (nxtSts) {
                // L1 - s -> e
                let tMiddle1 = await this.getCutStation(
                    startStation,
                    e,
                    timeCurrent,
                    false,
                );
                let tmpCut, tMiddle2, cut1, cut2;
                //turning e to c(e) and L2 c(e) -> n
                tmpCut = await this.getCutStation(e, nxtSts, tMiddle1 + 5);
                tMiddle2 = tmpCut.time;
                cut1 = tmpCut.cut;
                //turning n to c(n) and Lf c(n) -> f
                tmpCut = await this.getCutStation(
                    nxtSts,
                    finalStation,
                    tMiddle2 + 5,
                );
                cut2 = tmpCut.cut;
                //The station travels in their respecitve pairs ("route" for this travel)
                res.isMulti[index + 1] = [
                    parseInt(startStation_),
                    e.stationCode,
                    cut1.stationCode,
                    nxtSts.stationCode,
                    cut2.stationCode,
                    parseInt(finalStation_),
                ];
                //The arrival times of each pair ("times" for this travel)
                res[index + 1] = [];
                res[index + 1].push(timeCurrent);
                res[index + 1].push(tMiddle1);
                res[index + 1].push(tMiddle2);
                res[index + 1].push(tmpCut.time);
            }
        }
        for (let item = 1; item < 9; item++) {
            if (Array.isArray(res[item])) {
                if (
                    res['times'][res['times'].length - 1] >
                        res[item][res[item].length - 1] ||
                    res['times'].length == 0
                ) {
                    res['times'] = res[item];
                    res['route'] = res['isMulti'][item];
                }
            }
        }
        return res;
    }

    async getMulTime(startStation_, finalStation_, timeCurrent = 0, count = 5) {
        if (!timeCurrent) {
            let date = new Date(),
                timeHour = date.getHours(),
                timeMinute = date.getMinutes();
            timeCurrent = timeHour * 60 + timeMinute;
        } else {
            timeCurrent = parseInt(timeCurrent);
        }
        let res = {},
            station = [],
            route = await this.getMultiRoute(
                startStation_,
                finalStation_,
                timeCurrent,
            );
        for (let index = 0; index < route['route'].length; index++) {
            await MetroTehran.findStation({
                stationCode: parseInt(route['route'][index]),
            })
                .then((s) => {
                    station[index] = s.dataValues;
                })
                .catch((err) => {
                    console.error(`Failed to retrive the Station: ${err}`);
                });
        }
            res = [];
            for (let didex = 0; didex < station.length; didex += 2) {
                let des =
                    (station[didex + 1].stationCode % 100) > (station[didex].stationCode % 100) 
                        ? 1
                        : 2;
                res.push(this.getWaitTime(
                    station[didex]["lineNumber"],
                    station[didex][des == 1 ? 'baseTime1' : 'baseTime2'],
                    station[didex + 1][des == 1 ? 'baseTime1' : 'baseTime2'],
                    des,
                    route["times"][didex],
                    count,
                ));
            }
        return {route: route["route"], times: res}
    }
}

module.exports = {
    initialise: () => {
        this.masterWaiter = new MasterWaiter();
    },
    getEntryTime: (lineNumber, baseTime1, baseTime2) => {
        return {
            1: this.masterWaiter.getEntryTime(lineNumber, baseTime1, 1),
            2: this.masterWaiter.getEntryTime(lineNumber, baseTime2, 2),
        };
    },
    getWaitTime: (lineNumber, startStation, finalStation, des) => {
        return this.masterWaiter.getWaitTime(
            lineNumber,
            startStation,
            finalStation,
            des,
        );
    },
    getMulTime: async (startStation, finalStation, timeCurrent, count) => {
        return await this.masterWaiter.getMulTime(
            startStation,
            finalStation,
            timeCurrent,
            count,
        );
    },
};
