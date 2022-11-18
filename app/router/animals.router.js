const express = require("express");
const jwt = require("jsonwebtoken");
const responses = require("../constants/error.constants.js");
const nameRoutes = require("../constants/nameRoutes.constants.js");

const verifyToken = require("../middleware/middleware.js");
const ANIMALS = require("../data/animalsData.json");

const router = express.Router();
const code = Object.keys(responses);

router.get(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    // jwt.verify(request.token, "secretKey", (err, authData) => {
    //   if (err) {
    //     response.status(403).json({ error: { code: code[1] } });

    //     return;
    //   }
    // });
    response.json(
      ANIMALS.map((animal) => {
        return {
          id: animal.id,
          img: animal.img,
          name: animal.name,
          race: animal.race,
          type: animal.type,
        };
      })
    );
  } catch (error) {
    response.send("Error");
  }
});

router.get(nameRoutes.DEFAULT_ID, verifyToken, async (request, response) => {
  try {
    jwt.verify(request.token, "secretKey", (err, authData) => {
      if (err) {
        response.status(403).json({ error: { code: code[1] } });

        return;
      }
      const { id } = request.params;
      const animal = ANIMALS.find((pet) => pet.id === id);
      response.status(200).json(animal);
    });
  } catch (error) {
    response.send("Error");
  }
});

module.exports = router;
