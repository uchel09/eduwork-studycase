import ProductService from "../services/productService.js";
import { deleteImages } from "../utils/multer.js";

class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await ProductService.getAllProducts(req.query);

      console.log(`
  =======================================
  =======================================
  
  PRODUCT IN CONTROLLER
  ${products.data}
  =======================================
  =======================================
  =======================================
  `);
      if (products.data.length === 0) {
        return res.status(200).json({
          totalPages: 0,
          skip: products.skip,
          limit: products.limit,
          status: true,
          products: [],
          message: "No products found",
        });
      }

      res.status(200).json({
        totalPages: Math.ceil(products.total / products.limit),
        skip: products.skip,
        limit: products.limit,
        status: true,
        products: products.data,
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
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    let images = [];
    if (req.files) {
      // Iterasi melalui array file yang diunggah dan buat objek dengan properti image_url untuk setiap file
      req.files.map((file) => {
        images.push({
          image_url: `http://localhost:8000/public/${file.filename}`,
        });
      });
    }

    try {
      const product = await ProductService.createProduct(req.body, images);
      res.status(201).json({
        success: true,
        message: "create product success",
        product,
      });
    } catch (error) {
      deleteImages(images);
      next(error);
    }
  }

  static async update(req, res, next) {
    let images = [];
    if (req.files) {
      // Iterasi melalui array file yang diunggah dan buat objek dengan properti image_url untuk setiap file
      req.files.map((file) => {
        images.push({
          image_url: `http://localhost:8000/public/${file.filename}`,
        });
      });
    }
    try {
      const { id } = req.params;
      const updateProduct = req.body;
      const updatedProduct = await ProductService.updateProduct(
        id,
        updateProduct,
        images
      );
      if (images.length > 0) {
        deleteImages(updatedProduct.oldImages);
      }
      res.status(200).json({
        status: true,
        _id: updatedProduct.id,
        message: "update success",
      });
    } catch (error) {
      if (images) {
        console.log(images);
        deleteImages(images);
      }
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(id);
      deleteImages(product.images);
      res.status(200).json({ message: "Product deleted", _id: product._id });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
