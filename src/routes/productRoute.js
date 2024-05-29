import express from "express";
import ProductController from "../controllers/productCtrl.js";
import { upload } from "../utils/multer.js";
import { policy_check } from "../middlewares/caslMiddleware.js";
import userAuth from "../middlewares/authMiddleware.js";

export const productRouter = express.Router();

productRouter.post(
  "/",
  userAuth,
  policy_check("create", "Product"),
  upload.single("image"),
  ProductController.create
);
productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getById);
productRouter.put(
  "/:id",
  userAuth,
  policy_check("update", "Product"),
  upload.single("image"),
  ProductController.update
);
productRouter.delete(
  "/:id",
  userAuth,
  policy_check("delete", "Product"),
  ProductController.delete
);
