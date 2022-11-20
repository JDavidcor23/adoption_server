function getUser(request, response, authData) {
  response.status(200).json(authData.userExists);
}
module.exports = getUser;
