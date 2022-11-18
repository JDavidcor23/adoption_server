const express = require("express");

const user = require("./user.router.js");
const nameRoutes = require("../constants/nameRoutes.constants.js");
const login = require("./login.router.js");
const singUp = require("./singUp.router.js");
const inbox = require("./inbox.router.js");
const routerAnimal = require("./animals.router.js");
const favoritesAnimals = require("./favoritesAnimals.router.js");

function routerApi(app) {
  const router = express.Router();
  app.use(nameRoutes.VERSION, router);
  router.use(nameRoutes.USER, user);
  router.use(nameRoutes.INBOX, inbox);
  router.use(nameRoutes.LOGIN, login);
  router.use(nameRoutes.SIGNUP, singUp);
  router.use(nameRoutes.ANIMALS, routerAnimal);
  router.use(nameRoutes.FAVORITES_ANIMALS, favoritesAnimals);
}
module.exports = routerApi;
