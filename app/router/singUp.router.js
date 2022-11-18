import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { nameRoutes, responses } from "../constants/index.js";
import USERS from "../data/users.json" assert { type: "json" };

const router = express.Router();
const code = Object.keys(responses);

router.post(nameRoutes.DEFAULT, async (request, response) => {
  try {
    if (!USERS.some((u) => u.email === request.body.email)) {
      const uuid = uuidv4();
      const userExists = { ...request.body, uuid };
      USERS.push(userExists);
      jwt.sign({ userExists }, "secretKey", (err, token) => {
        response.status(200).json({ token });
      });
      return;
    }
    response.status(403).json({ error: { code: code[2] } });
  } catch (error) {
    throw new Error(error);
  }
});
export { router };
