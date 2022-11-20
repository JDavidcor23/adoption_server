const ANIMALS = require("../data/animalsData.json");

function getAnimals(request, response, authData) {
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
}

module.exports = getAnimals;
