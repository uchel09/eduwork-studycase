import express from "express";
import cartController from "../controllers/cartCtrl.js";
import { policy_check } from "../middlewares/caslMiddleware.js";
import userAuth from "../middlewares/authMiddleware.js";

export const cartRouter = express.Router();

cartRouter.put(
  "/",
  userAuth,
  policy_check("update", "Cart"),
  cartController.update
);
cartRouter.get("/", userAuth, cartController.getAll);
cartRouter.delete("/:id", userAuth, cartController.deleteById);