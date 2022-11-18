import cors from "cors";
import express from "express";
import morgan from "morgan";
import { routerApi } from "./router/router.js";

const app = express();

const port = 8000;

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.get("/", (request, response) => {
  response.send("");
});

routerApi(app);
app.listen(port, () => {
  console.log("mi port " + port);
});
