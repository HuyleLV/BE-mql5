const productController = require("../controller/product.controller");

module.exports = function (router) {

  router.get("/product/getAll", productController.getAll);
  router.get("/product/getAllMarket", productController.getAllMarket);
  router.get("/product/getByCategoryChild/:categoryChild_id", productController.getByCategoryChild);
  router.get("/product/getById/:product_id", productController.getById);
  router.post("/product/create", productController.create);
  router.post("/product/update/:product_id", productController.update);
  router.delete("/product/delete/:product_id", productController.delete);
};
