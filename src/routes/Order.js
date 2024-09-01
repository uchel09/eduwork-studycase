import express from "express";
import orderCtrl from "../controllers/orderCtrl.js";
import userAuth from "../middlewares/authMiddleware.js";

export const orderRouter = express.Router();

orderRouter.post("/", userAuth, orderCtrl.create);
orderRouter.get("/", userAuth, orderCtrl.getAllOrder);
orderRouter.get("/user", userAuth, orderCtrl.getOrderByUser);
orderRouter.get("/invoice/:id", userAuth, orderCtrl.getInvoice);
