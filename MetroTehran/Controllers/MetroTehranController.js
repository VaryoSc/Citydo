const MetroTehran = require("../../common/models/MetroTehran.js"),
WaitFinder = require("../services/WaitFinder.js");

module.exports = {
    getStation: (req, res) => {
      const {stationCode} = "stationCode" in req.body ? req.body : req.query;
  
      MetroTehran.findStation({ stationCode: stationCode })
        .then((Station) => {
          return res.status(200).json({
            status: true,
            data: Station.toJSON(),
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    },

    createStation: (req, res) => {
      const {
        body: payload,
      } = req;
  
      MetroTehran.createStation(payload)
        .then((Station) => {
          return res.status(200).json({
            status: true,
            data: Station.toJSON(),
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    },
  
    updateStation: (req, res) => {
      const {
        body: payload,
      } = req;

      // IF the payload does not have any keys,
      // THEN we can return an error, as nothing can be updated
      if (!Object.keys(payload).length) {
        return res.status(400).json({
          status: false,
          error: {
            message: "Body is empty, hence can not update the Station.",
          },
        });
      }
  
      MetroTehran.updateStation({ stationCode: payload.stationCode }, payload)
        .then(() => {
          return MetroTehran.findStation({ stationCode: payload.stationCode });
        })
        .then((Station) => {
          return res.status(200).json({
            status: true,
            data: Station.toJSON(),
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    },
  
    deleteStation: (req, res) => {
      const payload = Object.keys(req.body).length ?  req.body.stationCode : req.query.stationCode;
  
      MetroTehran.deleteStation({ stationCode: stationCode })
        .then((numberOfEntriesDeleted) => {
          return res.status(200).json({
            status: true,
            data: {
              numberOfStationsDeleted: numberOfEntriesDeleted
            },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    },
  
    getAllStation: (req, res) => {
      MetroTehran.findAllStation(req.query)
        .then((MetroTehran) => {
          return res.status(200).json({
            status: true,
            data: MetroTehran,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    },

    getEntryTime: (req, res) => {
      const payload = Object.keys(req.body).length ?  req.body : req.query;

      const time = WaitFinder.getEntryTime(payload.lineNumber, payload.baseTime1, payload.baseTime2);
        if(time) {
          return res.status(200).json({
            status: true,
            data: time,
          });
        }
        else {
          return res.status(500).json({
            status: false,
            error: err,
          });
        };
    },

    getWaitTime: (req, res) => {
      const payload = Object.keys(req.body).length ?  req.body : req.query;

      const time = WaitFinder.getWaitTime(payload.lineNumber, payload.entry, payload.exit, payload.des,);
      if (time) {
        return res.status(200).json({
          status: true,
          data: time,
        });
      }
      else {
        return res.status(500).json({
          status: false,
          error: err,
        });
      };
    },

    };  
