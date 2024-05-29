import { ResponseError } from "../middlewares/responseError.js";
import deliveryAddressModel from "../models/deliveryAddressModel.js";

class deliveryService {
  static async getAllDeliveryAddresses() {
    const deliveryAddress = await deliveryAddressModel.find();
    return deliveryAddress;
  }

  static async getDeliveryAddressById(id) {
    const deliveryAddress = await deliveryAddressModel.findById(id);
    if (!deliveryAddress) {
      throw new ResponseError(404, "not found");
    }
    return deliveryAddress;
  }

  static async createDeliveryAddress(address, userId) {
    let { name, kelurahan, kecamatan, kabupaten, provinsi, detail } = address;
    const newDeliveryAddress = new deliveryAddressModel({
      name,
      kelurahan,
      kecamatan,
      kabupaten,
      provinsi,
      detail,
      userId,
    });

    await newDeliveryAddress.validate();
    await newDeliveryAddress.save();

    return newDeliveryAddress;
  }

  static async updateDeliveryAddress(id, deliveryAddressUpdate,userId) {
    const { name, kelurahan, kecamatan, kabupaten, provinsi, detail } =
      deliveryAddressUpdate;
    const updatedDeliveryAddress = await deliveryAddressModel.findByIdAndUpdate(
      id,
      {
        name,
        kelurahan,
        kecamatan,
        kabupaten,
        provinsi,
        detail,
        userId
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedDeliveryAddress) {
      throw new ResponseError(404, "not found");
    }
    return updatedDeliveryAddress;
  }

    static async deleteDeliveryAddress(id) {
      const deliveryAddress = await deliveryAddressModel.findByIdAndDelete(id);
      if (!deliveryAddress) {
        throw new ResponseError(404, "not found");
      }

      return deliveryAddress;
    }
}

export default deliveryService;
