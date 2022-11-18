const _ = require("underscore");
const express = require("express");

const jwt = require("jsonwebtoken");
const responses = require("../constants/error.constants.js");
const nameRoutes = require("../constants/nameRoutes.constants.js");

const verifyToken = require("../middleware/middleware.js");
const USERS = require("../data/users.json");

const router = express.Router();
const code = Object.keys(responses);

router.get(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    jwt.verify(request.token, "secretKey", (err, authData) => {
      if (err) {
        response.status(403).json({ error: { code: code[1] } });

        return;
      }
      response.status(200).json(authData.userExists);
    });
  } catch (error) {
    response.send("Error");
  }
});

router.post(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    jwt.verify(request.token, "secretKey", (err, authData) => {
      if (err) {
        response.status(403).json({ error: { code: code[1] } });

        return;
      }
      const userExists = request.body;
      const index = USERS.findIndex((u) => u.uuid === authData.userExists.uuid);
      USERS.splice(index, 1, userExists);
      jwt.sign({ userExists }, "secretKey", (err, token) => {
        response.json({ token });
      });
    });
  } catch (error) {
    response.send("Error");
  }
});

module.exports = router;
