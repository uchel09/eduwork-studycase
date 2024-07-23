import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [5, "Panjang nama makanan minimal 5 karakter"],
      required: [true, "nama tidak boleh kosong"],
    },
    qty: {
      type: Number,
      required: [true, "quantity tidak boleh kosong"],
      min: [1, "minimal quantity 1"],
    },
    color: { type: String },
    size: { type: String },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
    },
  },
  {
    timestamps: true,
  }
);

const cartItemModel = mongoose.model("CartItem", cartItemSchema);

export default cartItemModel;
