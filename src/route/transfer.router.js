module.exports = function (router) {
    const transferController = require("../controller/transfer.controller");
    
    router.get("/transfer/getAll", transferController.getAll);
    router.get("/transfer/getById/:transfer_id", transferController.getById);
    router.post("/transfer/create", transferController.create);
    router.post("/transfer/updateStatus/:transfer_id", transferController.updateStatus);
    router.delete("/transfer/delete/:transfer_id", transferController.delete);
};