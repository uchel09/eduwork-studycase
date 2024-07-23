import express from "express";
import WilayahController from "../controllers/wilayahCtrl.js";


export const wilayahRouter = express.Router();

wilayahRouter.get("/provinsi", WilayahController.GetProvinsi);
wilayahRouter.get("/kabupaten/:id", WilayahController.GetKabupaten);
wilayahRouter.get("/kecamatan/:id", WilayahController.GetKecamatan);
wilayahRouter.get("/kelurahan/:id", WilayahController.GetKelurahan);
