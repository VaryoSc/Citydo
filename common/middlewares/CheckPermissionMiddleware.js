const UserModel = require("../models/Users");

module.exports = {
  has: (role) => {
    return (req, res, next) => {
      //Gets the user info from isAuthenticatedMiddlware
      const {
        user: { userId },
      } = req;

      UserModel.findUser({ id: userId }).then((user) => {
        // IF user does not exist in our database, means something is fishy
        // THEN we will return forbidden error and ask user to login again
        if (!user) {
          return res.status(403).json({
            status: false,
            error: "Invalid access token provided, please login again.",
          });
        }

        const userRole = user.role;

        // IF user does not possess the required role
        // THEN return forbidden
        if (!role.includes(userRole)) {
          return {
            status: 403, // Forbidden error code
            message:
              "You do not have the necessary permissions to perform this action.",
          };
        }

        next();
      });
    };
  },
};
