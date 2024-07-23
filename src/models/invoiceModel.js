import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
  sub_total: {
    type: Number,
    required: [true, "sub total tidak boleh kosong"],
  },
  delivery_fee: {
    type: Number,
    required: [true, "delivery fee tidak boleh kosong"],
  },
  delivery_address: {
    kelurahan: {
      type: String,
      required: [true, "kelurahan tidak boleh kosong"],
      maxLength: [255, "panjang maksimal nama kelurahan adalah 255 karakter"],
    },
    kecamatan: {
      type: String,
      required: [true, "kecamatan tidak boleh kosong"],
      maxLength: [255, "panjang maksimal nama kelurahan adalah 255 karakter"],
    },
    kabupaten: {
      type: String,
      required: [true, "kabupaten tidak boleh kosong"],
      maxLength: [255, "panjang maksimal nama kabupaten adalah 255 karakter"],
    },
    provinsi: {
      type: String,
      required: [true, "provinsi tidak boleh kosong"],
      maxLength: [255, "panjang maksimal nama provinsi adalah 255 karakter"],
    },
    detail: {
      type: String,
      required: [true, "detail alamat tidak boleh kosong"],
      maxLength: [1000, "panjang maksimal nama provinsi adalah 1000 karakter"],
    },
    phone_number: {
      type: String,
    },
  },
  total: {
    type: Number,
    required: [true, "total tidak boleh kosong"],
  },
  payment_status: {
    type: String,
    enum: ["waiting payment", "paid"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  order: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
  },
});

const invoiceModel = mongoose.model("Invoice", invoiceSchema);
export default invoiceModel;
