import { ResponseError } from "../middlewares/responseError.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import tagModel from "../models/tagModel.js";
import { deleteImage } from "../utils/multer.js";

class ProductService {
  static async getAllProducts(query) {
    let { skip = 0, limit = 5, category = [], tags = [], q = "" } = query;
    skip = parseInt(skip, 10);
    limit = parseInt(limit, 10);

    console.log(
      `Parameters received - Skip: ${isNaN(limit)}, Limit: ${isNaN(skip)}`
    );

    const searchQuery = {};
    if (q) {
      searchQuery.$or = [{ name: { $regex: q, $options: "i" } }];
    }

    if (category && category.length > 0) {
      const categoryDocs = await Promise.all(
        category.map(async (catName) => {
          return categoryModel.findOne({
            name: { $regex: new RegExp(`^${catName}$`, "i") },
          });
        })
      );
      const validCategoryDocs = categoryDocs.filter(
        (catDoc) => catDoc !== null
      );
      if (validCategoryDocs.length > 0) {
        searchQuery.category = { $in: validCategoryDocs.map((cat) => cat._id) };
      }
    }

    if (tags.length > 0) {
      const tagDocs = await Promise.all(
        tags.map(async (tagName) => {
          return tagModel.findOne({
            name: { $regex: new RegExp(`^${tagName}$`, "i") },
          });
        })
      );
      const validTagDocs = tagDocs.filter((tagDoc) => tagDoc !== null);

      if (validTagDocs.length > 0) {
        searchQuery.tags = { $in: validTagDocs.map((tag) => tag._id) };
      }
    }

    const isSearchQueryEmpty = Object.keys(searchQuery).length === 0;
    console.log("Search Query:", searchQuery);

    const products = await productModel
      .find(isSearchQueryEmpty ? {} : searchQuery)
      .skip(skip * limit)
      .limit(limit)
      .sort("-updatedAt")
      .populate({ path: "category", select: "-createdAt -updatedAt" })
      .populate({ path: "tags", select: "-createdAt -updatedAt" });
    console.log("Products found:", products);

    const totalProducts = await productModel.countDocuments(
      isSearchQueryEmpty ? {} : searchQuery
    );

    return {
      total: totalProducts,
      limit,
      skip,
      data:products,
    };
  }
  static async getProductById(id) {
    const product = await productModel
      .findById(id)
      .populate({ path: "category", select: "-createdAt -updatedAt" })
      .populate({ path: "tags", select: "-createdAt -updatedAt" });

    if (!product) {
      throw new ResponseError(404, "not found");
    }
    return product;
  }

  static async createProduct(product, images) {
    let {
      name,
      description,
      price = 0,
      colors,
      sizes,
      category: categoryName,
      tags: tagNames,
    } = product;

    let category = null;
    if (categoryName && categoryName.trim() !== "") {
      console.log(categoryName);
      category = await categoryModel.findOne({
        name: { $regex: new RegExp(`^${categoryName}$`, "i") },
      });
      if (!category) {
        throw new ResponseError(404, `category not found`);
      }
    }

    let tags = [];

    if (tagNames && Array.isArray(tagNames)) {
      const uniqueTagNames = [...new Set(tagNames)].filter(
        (tagName) => tagName.trim() !== ""
      );

      if (uniqueTagNames.length > 0) {
        tags = await Promise.all(
          uniqueTagNames.map(async (tagName) => {
            const tag = await tagModel.findOne({
              name: { $regex: new RegExp(`^${tagName}$`, "i") },
            });
            if (!tag) {
              throw new ResponseError(404, `Tag not found`);
            }
            return tag;
          })
        );
      }
    }
    price = parseInt(price);

    const newProduct = new productModel({
      name,
      description,
      price,
      images,
      colors,
      sizes,
      category: category ? category._id : undefined,
      tags: tags.map((tag) => tag._id),
    });

    await newProduct.validate();
    await newProduct.save();
    return newProduct;
  }

  //==========UPDATE PRODUCT==============
  static async updateProduct(id, updateProduct, images) {
    const {
      name,
      description,
      price,
      colors,
      sizes,
      category: categoryName,
      tag: tagNames,
    } = updateProduct;

    let category = null;
    if (categoryName && categoryName.trim() !== "") {
      category = await categoryModel.findOne({
        name: { $regex: new RegExp(`^${categoryName}$`, "i") },
      });
      if (!category) {
        throw new ResponseError(404, `category not found`);
      }
    }

    let tags = [];

    if (tagNames && Array.isArray(tagNames)) {
      const uniqueTagNames = [...new Set(tagNames)].filter(
        (tagName) => tagName.trim() !== ""
      );

      if (uniqueTagNames.length > 0) {
        tags = await Promise.all(
          uniqueTagNames.map(async (tagName) => {
            const tag = await tagModel.findOne({
              name: { $regex: new RegExp(`^${tagName}$`, "i") },
            });
            if (!tag) {
              throw new ResponseError(404, `Tag "${tagName}" tidak ditemukan`);
            }
            return tag;
          })
        );
      }
    }

    const product = await productModel.findById(id);
    if (!product) {
      throw new ResponseError(404, "not found");
    }
    const oldImages = product.images;
    if (images) {
      product.images = images;
    }

    if (price) {
      product.price = parseInt(price);
    }
    product.name = name || product.name;
    product.description = description || product.description;
    if (category) {
      product.category = category;
    }
    if (tags.length > 0) {
      product.tags = tags.map((tag) => tag._id);
    }

    if (colors?.length > 0) {
      product.colors = colors;
    }
    if (sizes?.length > 0) {
      product.sizes = sizes;
    }
    await product.save();
    return { id, oldImages };
  }

  //==========DELETE PRODUCT==============
  static async deleteProduct(id) {
    const product = await productModel.findById(id);
    if (!product) {
      throw new ResponseError(404, "not found");
    }

    await productModel.deleteOne({ _id: id });

    return product;
  }
}

export default ProductService;
