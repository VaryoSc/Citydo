const jwt = require("jsonwebtoken"),
  crypto = require("node:crypto"),
  Users = require("../../common/models/Users"),
  { roles, jwtSecret, jwtExpirationInSeconds } = require("../../config");

/**
 *Generates an Access Token using username and userId for the user's authentication
 */
const generateAccessToken = (username, userId) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    }
  );
};

/*
* Encrypts the password using SHA256 Algorithm
*/
const encryptPassword = (password) => {
  const hash = crypto.createHash("sha256").update(password);
  return hash.digest("hex");
};

module.exports = {
  register: (req, res) => {
    const payload = req.body;

    let encryptedPassword = encryptPassword(payload.password);
    const role = roles.USER;

    Users.createUser(
      Object.assign(payload, { password: encryptedPassword, role: role })
    )
      .then((user) => {
        // Generating an AccessToken for the user, which will be
        // required in every subsequent request.
        const accessToken = generateAccessToken(payload.username, user.id);

        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
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

  login: (req, res) => {
    const { username, password } = req.body;

    Users.findUser({ username })
      .then((user) => {
        // IF user is not found with the given username
        // THEN Return user not found error
        if (!user) {
          return res.status(400).json({
            status: false,
            error: {
              message: `Wrong username and/or password`,
            },
          });
        }

        const encryptedPassword = encryptPassword(password);

        // IF Provided password does not match with the one stored in the DB
        // THEN Return password mismatch error
        if (user.password !== encryptedPassword) {
          return res.status(400).json({
            status: false,
            error: {
              message: `Wrong username and/or password`,
            },
          });
        }

        // Generating an AccessToken for the user, which will be
        // required in every subsequent request.
        const accessToken = generateAccessToken(user.username, user.id);

        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
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
};
