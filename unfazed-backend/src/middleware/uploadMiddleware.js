const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|gif|bmp|svg/;
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isImageMime = file.mimetype.startsWith("image/");

  if (extname || isImageMime) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPG, PNG, WEBP, GIF) are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;