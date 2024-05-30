const Users = require("../../common/models/Users.js");

module.exports = {
    getUser: (req, res) => {
      const id = Object.keys(req.body).length ?  req.body.id : req.query.id;
  
      Users.findUser({ id: id })
        .then((user) => {
          return res.status(200).json({
            status: true,
            data: user.toJSON(),
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    },
  
    updateUser: (req, res) => {
      const {
        body: payload,
      } = req;
      const id = payload.id;
      // IF the payload does not have any keys,
      // THEN we can return an error, as nothing can be updated
      if (!Object.keys(payload).length) {
        return res.status(400).json({
          status: false,
          error: {
            message: "Body is empty, hence can not update the user.",
          },
        });
      }
  
      Users.updateUser({ id: id }, payload)
        .then(() => {
          return Users.findUser({ id: id });
        })
        .then((user) => {
          return res.status(200).json({
            status: true,
            data: user.toJSON(),
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    },
  
    deleteUser: (req, res) => {
      const payload = Object.keys(req.body).length ?  req.body : req.query;
      const id = payload.id;
  
      Users.deleteUser({ id: id })
        .then((numberOfEntriesDeleted) => {
          return res.status(200).json({
            status: true,
            data: {
              numberOfUsersDeleted: numberOfEntriesDeleted
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
  
    getAllUsers: (req, res) => {
      Users.findAllUsers(req.query)
        .then((users) => {
          return res.status(200).json({
            status: true,
            data: users,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    },
  
    changeRole: (req, res) => {
      const {
        body: { role, id },
      } = req;
  
      Users.updateUser({ id: id }, { role })
        .then(() => {
          return Users.findUser({ id: id });
        })
        .then((user) => {
          return res.status(200).json({
            status: true,
            data: user.toJSON(),
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    },
  };
  