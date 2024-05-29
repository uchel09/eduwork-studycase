import ProductService from "../services/productService.js";
import { deleteImage } from "../utils/multer.js";

class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await ProductService.getAllProducts(req.query);
      res.status(200).json({
        total: products.total,
        skip: products.skip,
        limit: products.limit,
        status: true,
        data: products.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.status(200).json({
        status: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const imageUrl = req.file ? req.file.filename : null;
    try {
      const product = await ProductService.createProduct(req.body, imageUrl);
      res.status(201).json({
        status: true,
        _id: product,
      });
    } catch (error) {
      deleteImage(imageUrl);
      next(error);
    }
  }

  static async update(req, res, next) {
    const imageUrl = req.file ? req.file.filename : null;
    try {
      const { id } = req.params;
      const updateProduct = req.body;
      const updatedProduct = await ProductService.updateProduct(
        id,
        updateProduct,
        imageUrl
      );
      if (imageUrl) {
        deleteImage(updatedProduct.oldImageUrl);
      }
      res.status(200).json({
        status: true,
        _id: updatedProduct.id,
        message: "update success",
      });
    } catch (error) {
      if (imageUrl) {
        console.log(imageUrl);
        deleteImage(imageUrl);
      }
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(id);
      deleteImage(product.image_url);
      res.status(200).json({ message: "Product deleted", _id: product._id });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
