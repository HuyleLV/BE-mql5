const licenseController = require("../controller/license.controller");

module.exports = function (router) {
  router.get("/license/getAll", licenseController.getAll);
  router.get("/license/getLicenseByAcc/:mt4_account", licenseController.getLicenseByMT4Account);
  router.get("/license/checkLicense", licenseController.checkLicense);
  router.post("/license/create", licenseController.create);
  router.post("/license/update", licenseController.update);
 };