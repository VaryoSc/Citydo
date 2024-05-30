const express = require('express'),
 router = express.Router(),
 {roles} = require('../config.js');

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");


// Controller Imports
const UserController = require("./Controllers/UserController");

// JSON Schema Imports for payload verification
const updateUserPayload = require("./schemas/updateUserPayload");
const changeRolePayload = require("./schemas/changeRolePayload");

// Protected route
router.get("/", [isAuthenticatedMiddleware.check], UserController.getUser);

router.patch(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateUserPayload),
  ],
  UserController.updateUser
);

router.get(
  "/all",
 [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has([roles.ADMIN, roles.OWNER])],
  UserController.getAllUsers
);

router.patch(
  "/change-role/",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has([roles.ADMIN, roles.OWNER]),
    SchemaValidationMiddleware.verify(changeRolePayload),
  ],
  UserController.changeRole
);

router.delete(
  "/delete/",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has([roles.ADMIN, roles.OWNER])],
  UserController.deleteUser
);

module.exports = router;