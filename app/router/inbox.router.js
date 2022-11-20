const express = require("express");
const verifyToken = require("../middleware/verifyToken.handler.js");
const { verifyGlobalFunction, getInbox } = require("../functions");
const nameRoutes = require("../constants/nameRoutes.constants.js");

const router = express.Router();

router.get(nameRoutes.DEFAULT_ID, verifyToken, async (request, response) => {
  try {
    verifyGlobalFunction(request, response, getInbox);
  } catch (error) {
    response.send("Error");
  }
});

module.exports = router;
