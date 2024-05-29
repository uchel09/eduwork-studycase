import express from "express";
import DeliveryAddressCtrl from "../controllers/deliveryAddressCtrl.js";

import { policy_check } from "../middlewares/caslMiddleware.js";
import userAuth from "../middlewares/authMiddleware.js";

export const DeliveryAddressRoute = express.Router();

DeliveryAddressRoute.post(
  "/",
  userAuth,
  policy_check("create", "DeliveryAddress"),
  DeliveryAddressCtrl.create
);
DeliveryAddressRoute.get("/", DeliveryAddressCtrl.getAll);
DeliveryAddressRoute.get("/:id", DeliveryAddressCtrl.getById);
DeliveryAddressRoute.put(
  "/:id",
  userAuth,
  policy_check("update", "DeliveryAddress"),
  DeliveryAddressCtrl.update
);
DeliveryAddressRoute.delete("/:id", DeliveryAddressCtrl.delete);
