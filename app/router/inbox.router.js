import _ from "underscore";
import express from "express";
import jwt from "jsonwebtoken";
import { nameRoutes, responses } from "../constants/index.js";
import { verifyToken } from "../middleware/middleware.js";
import USERS from "../data/users.json" assert { type: "json" };

const router = express.Router();
const code = Object.keys(responses);

router.get(nameRoutes.DEFAULT_ID, verifyToken, async (request, response) => {
  try {
    jwt.verify(request.token, "secretKey", (err, authData) => {
      if (err) {
        response.status(403).json({ error: { code: code[1] } });

        return;
      }
      const { id } = request.params;
      const contactUser = USERS.find((u) => u.uuid === id);

      response.status(200).json(contactUser);
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { router };
