const express = require("express"),
  app = express(),
  AuthorizationRoutes = require("./authorization/routes"),
  UserRoutes = require("./Users/routes"),
  Users = require("./common/models/Users"),
  MetroTehranRoutes = require("./MetroTehran/routes"),
  MetroTehran = require("./common/models/MetroTehran"),
  WaitFinder = require("./MetroTehran/services/WaitFinder.js"),
  cors = require("cors"),
  { port: PORT, sequelize } = require("./config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

Users.initialise(sequelize);
MetroTehran.initialise(sequelize);
WaitFinder.initialise();

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/mtehran", MetroTehranRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", PORT);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
