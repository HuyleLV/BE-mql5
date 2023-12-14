module.exports = function (router) {
    const productController = require("../controller/product.controller");
    
    router.get("/product/getAll", productController.getAll);
    router.get("/product/getById/:product_id", productController.getById);
    // router.post("/product/create", productController.create);
    // router.post("/product/update/:product_id", productController.update);
    // router.delete("/product/delete/:product_id", productController.delete);
};