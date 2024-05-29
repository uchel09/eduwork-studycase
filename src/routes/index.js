import { productRouter } from "./productRoute.js";
import { categoryRouter } from "./categoryRoute.js";
import { tagRouter } from "./tagRoute.js";
import { authRouter } from "./authRoute.js";
import { DeliveryAddressRoute } from "./deliveryAddressRoute.js";


const allRoutes = (app) => {
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/tags", tagRouter);
  app.use("/api/v1/delivery-addresses", DeliveryAddressRoute);
  app.use("/auth", authRouter);
};

export default allRoutes;
