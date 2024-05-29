import categoryService from "../services/categoryServices.js";

class ProductController {
  static async getAll(req, res, next) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json({
        length: categories.length,
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json({
        success: true,
        _id: category._id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatecategory = req.body;
      await categoryService.updateCategory(id, updatecategory);
      res.status(200).json({
        success: true,
        message: "update success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryService.deleteCategory(id);
      res.status(200).json({ success: true, message: "Product deleted" });
      console.log(category);
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
