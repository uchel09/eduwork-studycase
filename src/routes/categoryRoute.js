import express from "express";
import categoryCtrl from "../controllers/categoryCtrl.js";
import { policy_check } from "../middlewares/caslMiddleware.js";
import userAuth from "../middlewares/authMiddleware.js";

export const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  // userAuth,
  // policy_check("create", "Category"),
  categoryCtrl.create
);
categoryRouter.get("/", categoryCtrl.getAll);
categoryRouter.get("/:id", categoryCtrl.getById);
categoryRouter.put(
  "/:id",
  userAuth,
  policy_check("update", "Category"),
  categoryCtrl.update
);
categoryRouter.delete(
  "/:id",
  userAuth,
  policy_check("delete", "Category"),
  categoryCtrl.delete
);
