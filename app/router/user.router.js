import _ from "underscore";
import express from "express";
import jwt from "jsonwebtoken";
import { nameRoutes, responses } from "../constants/index.js";
import { verifyToken } from "../middleware/middleware.js";
import USERS from "../data/users.json" assert { type: "json" };

const router = express.Router();
const code = Object.keys(responses);

router.get(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    jwt.verify(request.token, "secretKey", (err, authData) => {
      if (err) {
        response.status(403).json({ error: { code: code[1] } });

        return;
      }
      response.status(200).json(authData.userExists);
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post(nameRoutes.DEFAULT, verifyToken, async (request, response) => {
  try {
    jwt.verify(request.token, "secretKey", (err, authData) => {
      if (err) {
        response.status(403).json({ error: { code: code[1] } });

        return;
      }
      const userExists = request.body;
      const index = USERS.findIndex((u) => u.uuid === authData.userExists.uuid);
      USERS.splice(index, 1, userExists);
      jwt.sign({ userExists }, "secretKey", (err, token) => {
        response.json({ token });
      });
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { router };
