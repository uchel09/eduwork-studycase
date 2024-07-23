import { ResponseError } from "../middlewares/responseError.js";
import cartItemModel from "../models/cartItemModel.js";
import productModel from "../models/productModel.js";

class CartService {
  static async updateCart(req, user) {
    const { items } = req;

    if (!Array.isArray(items)) {
      console.log(items);
      throw new Error("Invalid input: items should be an array.");
    }

    if (items.length === 0) {
      // hapus semua item cart jika tidak panjang item 0 dan return
      await cartItemModel.deleteMany({});
      return [];
    }
    const productIds = items.map((item) => {
      return item.product;
    });

    const products = await productModel.find({ _id: { $in: productIds } });
    let cartItems = items.map((item) => {
      let relatedProduct = products.find(
        (product) => product._id.toString() === item.product
      );
      return {
        name: relatedProduct.name,
        qty: item.qty,
        color: item.color,
        size: item.size,
        price: relatedProduct.price,
        image_url: relatedProduct.images[0].image_url,
        user,
        product: relatedProduct._id,
      };
    });

    // ====== Hapus item keranjang yang tidak ada dalam daftar baru ======
    await cartItemModel.deleteMany({
      user: user,
      $nor: cartItems.map((item) => ({
        product: item.product,
        size: item.size,
        color: item.color,
      })),
    });

    // ==== bulkwrite =========
    await cartItemModel.bulkWrite(
      cartItems.map((item) => ({
        updateOne: {
          filter: {
            user: user,
            product: item.product,
            color: item.color,
            size: item.size,
          },
          update: { $set: item },
          upsert: true,
        },
      }))
    );

    const newCart = await this.getAllCartItems(user);

    return newCart;
  }

  static async getAllCartItems(user) {
    const cartItems = await cartItemModel.find({ user });
    return cartItems;
  }

  static async deleteById(id) {
    const cartItam = await cartItemModel.findByIdAndDelete(id);
    console.log(cartItam);
  }
}

export default CartService;
