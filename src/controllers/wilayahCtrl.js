import request from "request";

class WilayahController {
  static async GetProvinsi(req, res, next) {
    const url =
      "https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json";
    await request(url).pipe(res);
  }
  static async GetKabupaten(req, res, next) {
    const { id } = req.params;
    const url = `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${id}.json`;
    request(url).pipe(res);
  }
  static async GetKecamatan(req, res, next) {
    const { id } = req.params;
    const url = `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${id}.json`;
    request(url).pipe(res);
  }
  static async GetKelurahan(req, res, next) {
    const { id } = req.params;
    const url = `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${id}.json`;
    request(url).pipe(res);
  }
}

export default WilayahController;
