import mongoose from "mongoose";

const wishListsSchema = mongoose.Schema({
  products: [{ type: mongoose.Types.ObjectId, ref: "Products" }],
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
});

const wishListsModel = mongoose.model("WishLists", wishListsSchema);

export default wishListsModel;
