import { productRouter } from "./productRoute.js";
import { categoryRouter } from "./categoryRoute.js";
import { tagRouter } from "./tagRoute.js";
import { authRouter } from "./authRoute.js";
import { DeliveryAddressRoute } from "./deliveryAddressRoute.js";
import { cartRouter } from "./cartRoute.js";
import { wilayahRouter } from "./wilayahRoute.js";
import { orderRouter } from "./Order.js";

const allRoutes = (app) => {
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/tags", tagRouter);
  app.use("/api/v1/delivery-addresses", DeliveryAddressRoute);
  app.use("/api/v1/cart", cartRouter);
  app.use("/auth", authRouter);
  app.use("/api/v1/orders", orderRouter);
  app.use("/api/v1/proxy", wilayahRouter);
};

export default allRoutes;
