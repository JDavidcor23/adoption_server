const express = require("express");

const jwt = require("jsonwebtoken");
const responses = require("../constants/error.constants.js");
const nameRoutes = require("../constants/nameRoutes.constants.js");

const USERS = require("../data/users.json");

const router = express.Router();
const code = Object.keys(responses);

router.post(nameRoutes.DEFAULT, async (request, response) => {
  try {
    const user = request.body;
    const userExists = USERS.find(
      (u) => u.password === user.password && u.email === user.email
    );
    if (userExists !== undefined) {
      jwt.sign({ userExists }, "secretKey", (err, token) => {
        response.json({ token, uuid: userExists.uuid });
      });
    } else {
      response.status(403).send({ error: { code: code[0] } });
    }
  } catch (error) {
    response.send("Error");
  }
});
module.exports = router;
