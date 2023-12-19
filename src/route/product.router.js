const productController = require("../controller/product.controller");
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

  router.get("/product/getAll", productController.getAll);
  router.get(
    "/product/getByCategoryChild/:categoryChild_id",
    productController.getByCategoryChild
  );
  router.get("/product/getById/:product_id", productController.getById);
  router.post(
    "/product/create",
    upload.single("product_link"),
    productController.create
  );
  // router.post("/product/update/:product_id", productController.update);
  // router.delete("/product/delete/:product_id", productController.delete);
};
