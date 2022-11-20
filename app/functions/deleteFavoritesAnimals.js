const _ = require("underscore");
const FAVORITES_ANIMALS = require("../data/favoritesAnimals.json");

function deleteFavoritesAnimals(request, response, authData) {
  const body = request.body;
  const id = FAVORITES_ANIMALS.findIndex(
    (user) => user.uuid === authData.userExists.uuid
  );
  _.each(FAVORITES_ANIMALS[id].animals, (d, i) => {
    if (d.id === body.id) {
      FAVORITES_ANIMALS[id].animals.splice(i, 1);
    }
  });
  response.json(FAVORITES_ANIMALS[id].animals);
}

module.exports = deleteFavoritesAnimals;
