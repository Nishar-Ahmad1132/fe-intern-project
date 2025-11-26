const multer = require("multer");
const path = require("path");

// disk storage with safe filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const safeName = `${req.user?.id || "anon"}-${Date.now()}${ext}`;
    cb(null, safeName);
  },
});

function fileFilter(req, file, cb) {
  // allow images only
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files are allowed!"), false);
  } else {
    cb(null, true);
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter,
});

module.exports = upload;
