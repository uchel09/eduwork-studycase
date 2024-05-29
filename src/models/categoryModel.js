import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name tidak boleh kosong"],
      unique:true,
      minLength: [4, "at least 4 character"]
    },
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("Categories", categorySchema);
export default categoryModel;
