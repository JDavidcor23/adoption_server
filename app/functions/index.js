const login = require("./login");
const signup = require("./signup");
const getUser = require("./getUser");
const postUser = require("./postUser");
const getInbox = require("./getInbox");
const getAnimals = require("./getAnimals");
const getAnimalById = require("./getAnimalById");
const getFavoritesAnimals = require("./getFavoritesAnimals");
const postFavoritesAnimals = require("./postFavoritesAnimals");
const verifyGlobalFunction = require("./verifyGlobalFunction");
const deleteFavoritesAnimals = require("./deleteFavoritesAnimals");

module.exports = {
  login,
  signup,
  getUser,
  postUser,
  getInbox,
  getAnimals,
  getAnimalById,
  getFavoritesAnimals,
  postFavoritesAnimals,
  verifyGlobalFunction,
  deleteFavoritesAnimals,
};
