const cors = require("cors");

const express = require("express");

const morgan = require("morgan");
const routerApi = require("./router/router.js");

const app = express();

const port = 8000;

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.get("/", (request, response) => {
  response.send("Hi i am GEORGE");
});
routerApi(app);
app.listen(port);
