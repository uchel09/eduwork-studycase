import CartService from "../services/cartService.js";

class CartController {
  static async update(req, res, next) {
    try {
      const cartItems = await CartService.updateCart(
        req.body,
        res.locals.user._id
      );

      res.status(200).json({
        success: true,
        cartItems,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const cartItems = await CartService.getAllCartItems(res.locals.user._id);
      res.status(200).json({
        success: true,
        cartItems,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req, res, next) {
    const { id } = req.params;
    console.log(id);
    try {
      await CartService.deleteById(id);
      req.status(200).json({
        message: "delete item success",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CartController;
