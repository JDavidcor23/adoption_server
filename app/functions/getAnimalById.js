const ANIMALS = require("../data/animalsData.json");

function getAnimalById(request, response, authData) {
  const { id } = request.params;
  const animal = ANIMALS.find((pet) => pet.id === id);
  response.status(200).json(animal);
}

module.exports = getAnimalById;
