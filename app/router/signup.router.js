const express = require("express");
const { signup } = require("../functions");
const nameRoutes = require("../constants/nameRoutes.constants.js");
const encryptPassword = require("../middleware/signup.handler.js");

const router = express.Router();

router.post(nameRoutes.DEFAULT, encryptPassword, async (request, response) => {
  try {
    signup(request, response);
  } catch (error) {
    response.send("Error");
  }
});
module.exports = router;
