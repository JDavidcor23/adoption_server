const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");

let uuid = v4();

function encryptPassword(request, response, next) {
  const password = request.body.password;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      response.send(err);
    } else {
      const body = { ...request.body, uuid, password: hash };
      request.body = body;
      next();
    }
  });
}

module.exports = encryptPassword;
