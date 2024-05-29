import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["waiting_payment", "processing", "in_delivery", "delivered"],
      default: "waiting_payment",
    },
    delivery_fee: {
      type: Number,
      default: 0,
    },
    delivery_address: {
      provinsi: {
        type: String,
        required: [true, "provinsi tidak boleh kosong"],
      },
      kabupaten: {
        type: String,
        required: [true, "kabupaten tidak boleh kosong"],
      },
      kecamatan: {
        type: String,
        required: [true, "kecamatan tidak boleh kosong"],
      },
      kelurahan: {
        type: String,
        required: [true, "kelurahan tidak boleh kosong"],
      },
      detail: { type: String },
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    order_items: [{ type: mongoose.Types.ObjectId, ref: "OrderItem" }],
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
