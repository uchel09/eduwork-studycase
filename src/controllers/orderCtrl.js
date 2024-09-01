import OrderService from "../services/orderService.js";

class OrderController {
  static async create(req, res, next) {
    try {
      const order = await OrderService.createOrder(req.body, res.locals.user);
      res.status(201).json({
        order,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllOrder(req, res, next) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json({
        length: orders.length,
        success: true,
        orders,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getOrderByUser(req, res, next) {
    try {
      const orders = await OrderService.getOrdersByUser(res.locals.user);
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getInvoice(req, res, next) {
    const { id } = req.params;
    try {
      const invoice = await OrderService.getInvoice(id);
      res.status(200).json({
        length: invoice.length,
        success: true,
        invoice,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
