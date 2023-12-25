module.exports = function (router) {
    const CommentController = require("../controller/comment.controller");
    
    router.get("/comment/getAll", CommentController.getAll);
    router.get("/comment/getById/:product_id", CommentController.getById);
    router.post("/comment/create", CommentController.create);
    router.delete("/comment/delete/:comment_id", CommentController.delete);
};