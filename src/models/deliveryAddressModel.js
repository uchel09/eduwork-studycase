import mongoose from "mongoose";

const deliveryAddressSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "nama tidak boleh kosong"],
      maxLength: [255, "panjang maksimal nama alamat adalah 255 karakter"],
    },
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
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const deliveryAddressModel = mongoose.model(
  "deliveryAddrress",
  deliveryAddressSchema
);

export default deliveryAddressModel;
