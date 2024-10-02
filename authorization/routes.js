const router = require("express").Router();

// Controller Imports
const AuthorizationController = require("./controllers/AuthorizationController"),
  ServerStatusController = require("./controllers/ServerStatusController");

// Middleware Imports
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

// JSON Schema Imports for payload verification
const registerPayload = require("./schemas/registerPayload");
const loginPayload = require("./schemas/loginPayload");

//Routes plannig and commands
router.post(
  "/signup",
  [SchemaValidationMiddleware.verify(registerPayload)],
  AuthorizationController.register,
);

router.post(
  "/login",
  [SchemaValidationMiddleware.verify(loginPayload)],
  AuthorizationController.login,
);

router.get("/check", ServerStatusController.check);
module.exports = router;
