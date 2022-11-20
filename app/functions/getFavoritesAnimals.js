const FAVORITES_ANIMALS = require("../data/favoritesAnimals.json");

function getFavoritesAnimals(request, response, authData) {
  const idUser = FAVORITES_ANIMALS.findIndex(
    (user) => user.uuid === authData.userExists.uuid
  );
  if (idUser >= 0) {
    response.status(200).json(FAVORITES_ANIMALS[idUser].animals);
  }
}

module.exports = getFavoritesAnimals;
