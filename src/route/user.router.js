const userController = require("../controller/user.controller");

module.exports = function (router) {

  router.get("/user/getAll", userController.getAll);
  router.get("/user/getById/:user_id", userController.getById);
  router.post("/user/create", userController.create);
  router.post("/user/update/:user_id", userController.update);
  router.post("/user/updateProfile/:user_id", userController.updateProfile);
  router.delete("/user/delete/:user_id", userController.delete);
};