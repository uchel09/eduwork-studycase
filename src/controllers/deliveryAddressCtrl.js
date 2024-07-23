import deliveryAddressService from "../services/deliveryAddressService.js";

class ProductController {
  static async getAll(req, res, next) {

    try {
      const deliveryAddresses =
        await deliveryAddressService.getAllDeliveryAddresses(res.locals.user._id);
      res.status(200).json({
        length: deliveryAddresses.length,
        success: true,
        addresses: deliveryAddresses,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const deliveryAddress =
        await deliveryAddressService.getDeliveryAddressById(id);
      res.status(200).json({
        success: true,
        data: deliveryAddress,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      console.log(res.locals.user._id);
      const deliveryAddress =
        await deliveryAddressService.createDeliveryAddress(
          req.body,
          res.locals.user._id
        );
      res.status(201).json({
        success: true,
        _id: deliveryAddress._id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const deliveryAddressUpdate = req.body;
      await deliveryAddressService.updateDeliveryAddress(
        id,
        deliveryAddressUpdate,
        res.locals.user._id
      );
      res.status(200).json({
        success: true,
        message: "update success",
      });
    } catch (error) {
      next(error);
    }
  }

    static async delete(req, res, next) {
      try {
        const { id } = req.params;
        await deliveryAddressService.deleteDeliveryAddress(id);
        res.status(200).json({ success: true, message: "delivery Address deleted" });
      } catch (error) {
        next(error);
      }
    }
}

export default ProductController;
