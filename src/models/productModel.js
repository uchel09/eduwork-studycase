import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "nama product tidak boleh kosong"],
      minLength: [3, "panjang nama product minimal 3 karakter"],
    },
    description: {
      type: String,
      maxLength: [1000, "panjang deskripsi maximal 1000 karakter"],
      default: "no description",
    },
    price: {
      type: Number,
      required: [true, "price tidak boleh kosong"],
      max: 10000000,
    },
    image_url: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tags" }],
  },
  { timeStamps: true }
);

const productModel = mongoose.model("Products", productSchema);
export default productModel;
