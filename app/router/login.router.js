import express from "express";
import jwt from "jsonwebtoken";
import { nameRoutes, responses } from "../constants/index.js";
import USERS from "../data/users.json" assert { type: "json" };

const router = express.Router();
const code = Object.keys(responses);

router.post(nameRoutes.DEFAULT, async (request, response) => {
  try {
    const user = request.body;
    const userExists = USERS.find(
      (u) => u.password === user.password && u.email === user.email
    );
    if (userExists !== undefined) {
      jwt.sign({ userExists }, "secretKey", (err, token) => {
        response.json({ token, uuid: userExists.uuid });
      });
    } else {
      response.status(403).send({ error: { code: code[0] } });
    }
  } catch (error) {
    throw new Error(error);
  }
});
export { router };
