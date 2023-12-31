const comment = require("../model/comment");
const formatDate = require("../common/formatDate");
module.exports = {

    getAll:(req, res) => {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        console.log(page);
        comment.getAll(page, pageSize, (result) => {
            res.send(result);
        });
    },

    getById:(req, res) => {
        const product_id = req.params.product_id;
        comment.getById(product_id, (result) => {
            res.send(result);
        });
    },
    
    create:(req, res) => {
        const comment_content = req.body.comment_content;
        const comment_star = req.body.comment_star;
        const product_id = req.body.product_id;
        const create_at = formatDate(new Date());
        const create_by = req.body.create_by;
        comment.create(comment_content, comment_star, product_id, create_at, create_by, (result) => {
            res.send(result);
        });
    },

    delete:(req, res) => {
        const comment_id = req.params.comment_id;
        comment.delete(comment_id, (result) => {
            res.send(result);
        });
    },
}