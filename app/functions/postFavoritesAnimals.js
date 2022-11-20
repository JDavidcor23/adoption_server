const FAVORITES_ANIMALS = require("../data/favoritesAnimals.json");

function postFavoritesAnimals(request, response, authData) {
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
}

module.exports = postFavoritesAnimals;
