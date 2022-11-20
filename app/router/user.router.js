const express = require("express");
const verifyToken = require("../middleware/verifyToken.handler.js");
const nameRoutes = require("../constants/nameRoutes.constants.js");
const { verifyGlobalFunction, getUser, postUser } = require("../functions");

const router = express.Router();

router.get(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    verifyGlobalFunction(request, response, getUser);
  } catch (error) {
    response.send("Error");
  }
});

router.post(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    verifyGlobalFunction(request, response, postUser);
  } catch (error) {
    response.send("Error");
  }
});

module.exports = router;
