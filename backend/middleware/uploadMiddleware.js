const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../helper/cloudinaryConfig");

const uploadPath = path.join(__dirname, "uploads", "images");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const cloudinaryUploadMiddleware = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  try {
    const imagePromises = req.files.map(async (file) => {
      const filePath = path.join(uploadPath, file.filename);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "uploads",
      });

      fs.unlinkSync(filePath);

      return result.secure_url;
    });

    req.body.images = await Promise.all(imagePromises);
    next();
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    return res.status(500).json({ error: "Error uploading images" });
  }
};

module.exports = {
  upload,
  cloudinaryUploadMiddleware,
};
