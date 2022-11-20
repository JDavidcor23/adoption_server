const USERS = require("../data/users.json");

function getInbox(request, response, authData) {
  const { id } = request.params;
  const contactUser = USERS.find((u) => u.uuid === id);

  response.status(200).json(contactUser);
}

module.exports = getInbox;
