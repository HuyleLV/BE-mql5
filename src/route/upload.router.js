const uploadController = require("../controller/upload.controller");
const multer = require("multer");

module.exports = function (router) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file.mimetype);
      if (file.mimetype.includes("image")) {
        cb(null, `${process.env.DIR_UPLOADS}/image`);
      }else if (file.mimetype.includes("application")) {
        cb(null, `${process.env.DIR_UPLOADS}/application`);
      }else {
        cb(null, `${process.env.DIR_UPLOADS}/other`);
      }
    },
    filename: (req, file, cb) => {
      const newFileName = `${Date.now()}_${file.originalname}`;
      cb(null, newFileName);
    },
  });
  const upload = multer({ storage: storage });

  router.post("/upload/file", upload.single("product_link"), uploadController.upload);
};
