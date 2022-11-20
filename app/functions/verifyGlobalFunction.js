const jwt = require("jsonwebtoken");

function verifyGlobalFunction(request, response, func) {
  jwt.verify(request.token, "secretKey", (err, authData) => {
    if (err) {
      response.status(403).json({ error: { code: "Invalid credentials" } });
      return;
    }
    func(request, response, authData);
  });
}

module.exports = verifyGlobalFunction;
