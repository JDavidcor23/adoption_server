import express from "express";
import { router as user } from "./user.router.js";
import { nameRoutes } from "../constants/index.js";
import { router as login } from "./login.router.js";
import { router as singUp } from "./singUp.router.js";
import { router as inbox } from "./inbox.router.js";
import { router as routerAnimal } from "./animals.router.js";
import { router as favoritesAnimals } from "./favoritesAnimals.router.js";

export function routerApi(app) {
  const router = express.Router();
  app.use(nameRoutes.VERSION, router);
  router.use(nameRoutes.USER, user);
  router.use(nameRoutes.INBOX, inbox);
  router.use(nameRoutes.LOGIN, login);
  router.use(nameRoutes.SIGNUP, singUp);
  router.use(nameRoutes.ANIMALS, routerAnimal);
  router.use(nameRoutes.FAVORITES_ANIMALS, favoritesAnimals);
}
