const uploadController = require("../controller/upload.controller");
const multer = require("multer");

module.exports = function (router) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${process.env.DIR_UPLOADS}`);
    },
    filename: (req, file, cb) => {
      const newFileName = `${Date.now()}_${file.originalname}`;
      cb(null, newFileName);
    },
  });
  const upload = multer({ storage: storage });

  router.post("/upload/file", upload.single("product_link"), uploadController.upload);
};
