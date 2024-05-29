import express from "express";
import tagCtrl from "../controllers/tagCtrl.js";
import { policy_check } from "../middlewares/caslMiddleware.js";
import userAuth from "../middlewares/authMiddleware.js";

export const tagRouter = express.Router();

tagRouter.post("/", userAuth, policy_check("create", "Tags"), tagCtrl.create);
tagRouter.get("/",userAuth, tagCtrl.getAll);
tagRouter.get("/:id", tagCtrl.getById);
tagRouter.put("/:id",userAuth,policy_check("update","Tags"), tagCtrl.update);
tagRouter.delete("/:id",userAuth,policy_check("delete", "Tags"), tagCtrl.delete);
