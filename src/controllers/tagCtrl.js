import TagService from "../services/tagService.js";

class ProductController {
  static async getAll(req, res, next) {
    try {
      const tags = await TagService.getAllTags();
      res.status(200).json({
        length: tags.length,
        success: true,
        tags,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const tag = await TagService.getTagById(id);
      res.status(200).json({
        success: true,
        tag,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const tag = await TagService.createTag(req.body);
      res.status(201).json({
        success: true,
        _id: tag._id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const tagUpdate = req.body;
      await TagService.updateTag(id, tagUpdate);
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
      await TagService.deleteTag(id);
      res.status(200).json({ success: true, message: "Tag deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
