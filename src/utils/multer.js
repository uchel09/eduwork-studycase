import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const upload = multer({ storage });
//delete single image
export const deleteImage = (imagePath) => {
  if (imagePath) {
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(imagePath)
    );
    console.log(`Attempting to delete image at: ${filePath}`);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete old image: ${err.message}`);
      } else {
        console.log(`Successfully deleted image at: ${filePath}`);
      }
    });
  }
};

//delete array images
export const deleteImages = (images) => {
  if (images && Array.isArray(images)) {
    images.forEach((item) => deleteImage(item.image_url));
  }
};
