const USERS = require("../data/users.json");
const jwt = require("jsonwebtoken");

function signup(request, response) {
  if (!USERS.some((u) => u.email === request.body.email)) {
    const userExists = request.body;
    USERS.push(userExists);
    jwt.sign({ userExists }, "secretKey", (err, token) => {
      response.status(200).json({ token });
    });
    return;
  }
  response.status(422).json({ error: "User already exists" });
}
module.exports = signup;
