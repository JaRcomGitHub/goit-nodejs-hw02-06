const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "./../../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 1048576,
  },
});

module.exports = {
  uploadMiddleware,
};
