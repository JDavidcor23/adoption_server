const _ = require("underscore");
const express = require("express");

const jwt = require("jsonwebtoken");
const responses = require("../constants/error.constants.js");
const nameRoutes = require("../constants/nameRoutes.constants.js");

const verifyToken = require("../middleware/middleware.js");
const USERS = require("../data/users.json");

const router = express.Router();
const code = Object.keys(responses);

router.get(nameRoutes.DEFAULT_ID, verifyToken, async (request, response) => {
  try {
    jwt.verify(request.token, "secretKey", (err, authData) => {
      if (err) {
        response.status(403).json({ error: { code: code[1] } });

        return;
      }
      const { id } = request.params;
      const contactUser = USERS.find((u) => u.uuid === id);

      response.status(200).json(contactUser);
    });
  } catch (error) {
    response.send("Error");
  }
});

module.exports = router;
