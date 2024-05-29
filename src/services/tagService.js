import { ResponseError } from "../middlewares/responseError.js";
import tagModel from "../models/tagModel.js";

class TagService {
  static async getAllTags() {
    const tag = await tagModel.find();
    return tag;
  }

  static async getTagById(id) {
    const tag = await tagModel.findById(id);
     if (!tag) {
       throw new ResponseError(404, "not found");
     }
    return tag;
  }

  static async createTag(tag) {
    let { name } = tag;
    const newTag = new tagModel({
      name,
    });

    await newTag.validate();
    await newTag.save();
    console.log(newTag);
    return newTag;
  }

  static async updateTag(id, updateTag) {
    const { name } = updateTag;
    const updatedTag = await tagModel.findByIdAndUpdate(
      id,
      {
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTag) {
      throw new ResponseError(404, "not found");
    }
    return updateTag;
  }

  static async deleteTag(id) {
    const tag = await tagModel.findByIdAndDelete(id);
    if(!tag){
        throw new ResponseError(404,"not found")
    }

    return tag;
  }
}

export default TagService;
