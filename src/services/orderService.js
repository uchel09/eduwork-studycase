import mongoose, { Types } from "mongoose";
import { ResponseError } from "../middlewares/responseError.js";
import cartItemModel from "../models/cartItemModel.js";
import deliveryAddressModel from "../models/deliveryAddressModel.js";
import orderModel from "../models/orderModel.js";
import orderItemsModel from "../models/orderItemsMode.js";
import invoiceModel from "../models/invoiceModel.js";

class OrderService {
  static async createInvoice(order, order_items) {
    let subTotal = order_items.reduce(
      (total, item) => (total += item.price * item.qty),
      0
    );

    let invoice = new invoiceModel({
      user: order.user,
      order: order._id,
      sub_total: parseInt(subTotal),
      delivery_fee: parseInt(order.delivery_fee),
      total: parseInt(subTotal + order.delivery_fee),
      delivery_address: {
        provinsi: order.delivery_address.provinsi,
        kabupaten: order.delivery_address.kabupaten,
        kecamatan: order.delivery_address.kecamatan,
        kelurahan: order.delivery_address.kelurahan,
        detail: order.delivery_address.detail,
        phone_number: order.delivery_address.phone_number,
      },
      user: order.user,
    });
    await invoice.save();
  }
  static async createOrder(orders, user) {
    let { delivery_fee, delivery_address } = orders;

    const session = await mongoose.startSession();
    session.startTransaction();
    const items = await cartItemModel.find({ user }).populate("product");
    if (!items) {
      throw new ResponseError(
        400,
        "You are not create Order because no item in cart"
      );
    }

    let address = await deliveryAddressModel.findById(delivery_address);

    let order = new orderModel({
      _id: new Types.ObjectId(),
      status: "waiting payment",
      delivery_fee,
      delivery_address: {
        provinsi: address.provinsi,
        kabupaten: address.kabupaten,
        kecamatan: address.kecamatan,
        kelurahan: address.kelurahan,
        detail: address.detail,
        phone_number: address.phone_number,
      },
      user,
    });

    let orderItems = await orderItemsModel.insertMany(
      items.map((item) => ({
        ...item,
        name: item.name,
        qty: parseInt(item.qty),
        color: item.color,
        size: item.size,
        price: parseInt(item.price),
        order: order._id,
        product: item.product._id,
      }))
    );

    await orderItems.forEach(
      async (item) => await order.order_items.push(item._id)
    );

    this.createInvoice(order, orderItems);
    await order.save();

    await cartItemModel.deleteMany({ user });

    await session.commitTransaction();
    session.endSession();

    return order;
  }

  static async getAllOrders() {
    const order = await orderModel.find().populate("order_items");
    return order;
  }
  static async getOrdersByUser(userId){
      const order = await orderModel.find({user:userId}).populate("order_items");
      return order;
  }
  static async getInvoice(orderId) {
    const invoice = await invoiceModel
      .find({ order: orderId })
      .populate("order user")

    return invoice;
  }
}

export default OrderService;
