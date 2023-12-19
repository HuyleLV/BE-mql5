module.exports = function (router) {
    const productController = require("../controller/product.controller");
    const multer  = require('multer');
    const upload = multer({ dest: 'uploads/' });
    
    router.get("/product/getAll", productController.getAll);
    router.get("/product/getByCategoryChild/:categoryChild_id", productController.getByCategoryChild);
    router.get("/product/getById/:product_id", productController.getById);
    router.post("/product/create", upload.single('product_link'), productController.create);
    // router.post("/product/update/:product_id", productController.update);
    // router.delete("/product/delete/:product_id", productController.delete);
};