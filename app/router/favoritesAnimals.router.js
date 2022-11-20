const express = require("express");
const verifyToken = require("../middleware/verifyToken.handler.js");
const nameRoutes = require("../constants/nameRoutes.constants.js");
const {
  verifyGlobalFunction,
  getFavoritesAnimals,
  postFavoritesAnimals,
  deleteFavoritesAnimals,
} = require("../functions");

const router = express.Router();

router.get(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    verifyGlobalFunction(request, response, getFavoritesAnimals);
  } catch (error) {
    response.send("Error");
  }
});

router.post(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    verifyGlobalFunction(request, response, postFavoritesAnimals);
  } catch (error) {
    response.send("Error");
  }
});

router.delete(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    verifyGlobalFunction(request, response, deleteFavoritesAnimals);
  } catch (error) {
    response.send("Error");
  }
});

module.exports = router;
