import { ResponseError } from "../middlewares/responseError.js";
import categoryModel from "../models/categoryModel.js";

class CategoryService {
  static async getAllCategories() {
    const products = await categoryModel.find();
    return products;
  }

  static async getCategoryById(id) {
    const category = await categoryModel.findById(id);
    if (!category) {
      throw new ResponseError(404, "not found");
    }
    return category;
  }

  static async createCategory(category) {
    let { name } = category;

    if (name)name = name.toLowerCase();

    const newCategory = new categoryModel({
      name,
    });

    await newCategory.validate();
    await newCategory.save();
    console.log(newCategory);
    return newCategory;
  }

  static async updateCategory(id, updateCategory) {
    let { name } = updateCategory;
    if (name) name = name.toLowerCase();


    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      throw new ResponseError(404, "not found");
    }

    return updatedCategory;
  }

  static async deleteCategory(id) {
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new ResponseError(404, "not found");
    }
    return category;
  }
}

export default CategoryService;
