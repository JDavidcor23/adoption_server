const express = require("express");
const nameRoutes = require("../constants/nameRoutes.constants.js");
const {
  verifyGlobalFunction,
  getAnimals,
  getAnimalById,
} = require("../functions");

const verifyToken = require("../middleware/verifyToken.handler.js");

const router = express.Router();

router.get(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    verifyGlobalFunction(request, response, getAnimals);
  } catch (error) {
    response.send("Error");
  }
});

router.get(nameRoutes.DEFAULT_ID, verifyToken, async (request, response) => {
  try {
    verifyGlobalFunction(request, response, getAnimalById);
  } catch (error) {
    response.send("Error");
  }
});

module.exports = router;
