const USERS = require("../data/users.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function postUser(request, response, authData) {
  const user = request.body;
  const index = USERS.findIndex((u) => u.uuid === authData.userExists.uuid);

  bcrypt.compare(user.password, USERS[index].password, function (err, res) {
    if (res) {
      const userExists = { ...user, password: USERS[index].password };
      USERS.splice(index, 1, userExists);
      jwt.sign({ userExists }, "secretKey", (err, token) => {
        response.json({ token });
      });
      return;
    }
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (!err) {
        const userExists = { ...user, password: hash };
        USERS.splice(index, 1, userExists);
        jwt.sign({ userExists }, "secretKey", (err, token) => {
          response.json({ token });
        });
        return;
      }
    });
  });
}

module.exports = postUser;
