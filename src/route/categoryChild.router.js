module.exports = function (router) {
    const categoryChildController = require("../controller/categoryChild.controller");
    
    router.get("/categoryChild/getAll", categoryChildController.getAll);
    router.get("/categoryChild/getById/:categoryChild_id", categoryChildController.getById);
    // router.post("/categoryChild/create", categoryChildController.create);
    // router.post("/categoryChild/update/:categoryChild_id", categoryChildController.update);
    // router.delete("/categoryChild/delete/:categoryChild_id", categoryChildController.delete);
};