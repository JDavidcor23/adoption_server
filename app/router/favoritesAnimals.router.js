const _ = require("underscore");
const express = require("express");

const responses = require("../constants/error.constants.js");
const nameRoutes = require("../constants/nameRoutes.constants.js");

const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/middleware.js");
const FAVORITES_ANIMALS = require("../data/favoritesAnimals.json");

const router = express.Router();
const code = Object.keys(responses);

router.get(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    jwt.verify(request.token, "secretKey", (err, authData) => {
      if (err) {
        response.status(403).json({ error: { code: code[1] } });

        return;
      }
      const idUser = FAVORITES_ANIMALS.findIndex(
        (user) => user.uuid === authData.userExists.uuid
      );
      if (idUser >= 0) {
        response.status(200).json(FAVORITES_ANIMALS[idUser].animals);
      }
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
      const body = request.body;
      const idUser = FAVORITES_ANIMALS.findIndex(
        (user) => user.uuid === authData.userExists.uuid
      );
      if (idUser >= 0) {
        const isTheAnimalInFavorites = FAVORITES_ANIMALS[idUser].animals.some(
          (animal) => animal.id === body.id
        );
        if (!isTheAnimalInFavorites) {
          FAVORITES_ANIMALS[idUser].animals.push(body);
          response.status(200).json(FAVORITES_ANIMALS);
          return;
        }
        response.status(403).json({ resp: "the animal is already exists" });
        return;
      }

      let data = {
        uuid: authData.userExists.uuid,
        animals: [body],
      };
      FAVORITES_ANIMALS.push(data);
      response.status(200).json(FAVORITES_ANIMALS);
    });
  } catch (error) {
    response.send("Error");
  }
});

router.delete(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    jwt.verify(request.token, "secretKey", (err, authData) => {
      if (err) {
        response.status(403).json({ error: { code: code[1] } });

        return;
      }
      const body = request.body;
      _.each(FAVORITES_ANIMALS, (d, i) => {
        if (d.id == body.id) {
          FAVORITES_ANIMALS.splice(i, 1);
        }
      });
      response.json(FAVORITES_ANIMALS);
    });
  } catch (error) {
    response.send("Error");
  }
});

module.exports = router;
