import mongoose from "mongoose";

const orderItemsSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [5, "minimal nama product 5 character"],
    required: [true, "nama tidak boleh kosong"],
  },
  price: {
    type: Number,
    required: [true, "price tidak boleh kosong"],
  },
  qty: {
    type: Number,
    required: [true, "quantity tidak boleh kosong"],
  },
  color: { type: String },
  size: { type: String },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Products",
  },
  order: {
    type: mongoose.Types.ObjectId,
    ref: "Orders",
  },
});

const orderItemsModel = mongoose.model("OrderItems", orderItemsSchema);
export default orderItemsModel;
