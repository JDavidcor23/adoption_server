const express = require("express");

const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid");
const responses = require("../constants/error.constants.js");
const nameRoutes = require("../constants/nameRoutes.constants.js");

const USERS = require("../data/users.json");

const router = express.Router();
const code = Object.keys(responses);

router.post(nameRoutes.DEFAULT, async (request, response) => {
  try {
    if (!USERS.some((u) => u.email === request.body.email)) {
      const uuid = uuidv4();
      const userExists = { ...request.body, uuid };
      USERS.push(userExists);
      jwt.sign({ userExists }, "secretKey", (err, token) => {
        response.status(200).json({ token });
      });
      return;
    }
    response.status(403).json({ error: { code: code[2] } });
  } catch (error) {
    response.send("Error");
  }
});
module.exports = router;
