import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
import invoiceModel from "./invoiceModel.js";

const AutoIncrement = mongooseSequence(mongoose);

const orderSchema = mongoose.Schema(
  {
    status: {
      type: String,
      enum: [
        "waiting payment",
        "paid",
        "cancelled",
        "processing",
        "in delivery",
        "delivered",
      ],
      default: "waiting payment",
    },
    order_number: Number,
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
      phone_number: {
        type: String,
        required: true,
        maxLength: [
          20,
          "Panjang maximal no hp tidak boleh lebih dari 20 karakter",
        ],
      },
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    order_items: [{ type: mongoose.Types.ObjectId, ref: "OrderItems" }],
  },
  { timestamps: true }
);

orderSchema.plugin(AutoIncrement, { inc_field: "order_number" });
orderSchema.virtual("items_count").get(function () {
  return this.order_items.reduce(
    (total, item) => (total += item.price * parseInt(item.qty)),
    0
  );
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
