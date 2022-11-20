const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const USERS = require("../data/users.json");

function login(request, response) {
  const user = request.body;
  const userFind = USERS.find((u) => u.email === user.email);
  if (userFind !== undefined) {
    const id = USERS.findIndex((u) => u.email === userFind.email);
    bcrypt.compare(user.password, USERS[id].password, function (err, res) {
      if (res) {
        const userExists = USERS[id];
        jwt.sign({ userExists }, "secretKey", (err, token) => {
          response.json({ token });
        });
        return;
      }
      response.status(401).send({ error: "Invalid password" });
      return;
    });
    return;
  }

  response.status(401).send({ error: "User not found" });
}
module.exports = login;
