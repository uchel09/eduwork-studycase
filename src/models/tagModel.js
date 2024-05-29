import mongoose from "mongoose";

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Panjang nama tag minimal 3 karakter"],
      maxLength: [20, "Panjang nama tag maximal 20 karakter"],
      required: [true, "nama tag tidak boleh kosong"],
    },
  },
  {
    timestamps: true,
  }
);



const tagModel = mongoose.model("Tags", tagSchema);
export default tagModel;
