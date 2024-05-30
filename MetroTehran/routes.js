const express = require("express");
const router = express.Router();
const { roles } = require("../config.js");

// Controller Imports
const MetroTehranController = require("./Controllers/MetroTehranController");

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const updateStationPayload = require("./schemas/updateStationPayload.js");
const insertStationPayload = require("./schemas/insertStationPayload.js");

// Protected route
router.get("/get", MetroTehranController.getStation);

router.get("/getstatime", MetroTehranController.getEntryTime);

router.get("/getwaitime", MetroTehranController.getWaitTime);

router.post(
  "/create",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(insertStationPayload),
    CheckPermissionMiddleware.has(roles.ADMIN),
  ],
  MetroTehranController.createStation
);

router.patch(
  "/update",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateStationPayload),
    CheckPermissionMiddleware.has(roles.ADMIN),
  ],
  MetroTehranController.updateStation
);

router.get( "/all", MetroTehranController.getAllStation );

router.delete(
  "/delete/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  MetroTehranController.deleteStation
);

module.exports = router;
