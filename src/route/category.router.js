module.exports = function (router) {
    const categoryController = require("../controller/category.controller");
    
    router.get("/category/getAll", categoryController.getAll);
    router.get("/category/getAllAdmin", categoryController.getAllAdmin);
    router.get("/category/getById/:category_id", categoryController.getById);
    router.get("/category/getProductById/:category_id", categoryController.getProductById);
    router.post("/category/create", categoryController.create);
    router.post("/category/update/:category_id", categoryController.update);
    router.delete("/category/delete/:category_id", categoryController.delete);
};