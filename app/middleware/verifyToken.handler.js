function verifyToken(request, response, next) {
  const bearHeader = request.headers["authorization"];
  if (typeof bearHeader !== "undefined") {
    bearHeader.split(" ")[1];
    request.token = bearHeader.split(" ")[1];
    next();
  } else {
    response.status(403).json({ resp: "Invalidated credentials verifyToken" });
  }
}
module.exports = verifyToken;
