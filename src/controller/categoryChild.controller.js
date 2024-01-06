const categoryChild = require("../model/categoryChild");
const formatDate = require("../common/formatDate");
module.exports = {

    getAll:(req, res) => {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        categoryChild.getAll(page, pageSize, (result) => {
            res.send(result);
        });
    },

    getById:(req, res) => {
        const categoryChild_id = req.params.categoryChild_id;
        categoryChild.getById(categoryChild_id, (result) => {
            res.send(result);
        });
    },

    getProductById:(req, res) => {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const categoryChild_id = req.query.categoryChild_id;
        const category_id = req.query.category_id;
        categoryChild.getProductById(page, pageSize, category_id, categoryChild_id, (result) => {
            res.send(result);
        });
    },
    
    create:(req, res) => {
        const categoryChild_name = req.body.categoryChild_name;
        const categoryChild_description = req.body.categoryChild_description;
        const categoryChild_link = req.body.categoryChild_link;
        const category_id = req.body.category_id;
        const create_at = formatDate(new Date());
        const create_by = req.body.create_by;
        categoryChild.create(categoryChild_name, categoryChild_description, categoryChild_link, category_id, create_at, create_by, (result) => {
            res.send(result);
        });
    },

    update:(req, res) => {
        const categoryChild_id = req.params.categoryChild_id;
        const categoryChild_name = req.body.categoryChild_name;
        const categoryChild_description = req.body.categoryChild_description;
        const categoryChild_link = req.body.categoryChild_link;
        const category_id = req.body.category_id;
        const create_by = req.body.create_by;
        categoryChild.update(categoryChild_id, categoryChild_name, categoryChild_description, categoryChild_link, category_id, create_by, (result) => {
            res.send(result);
        });
    },

    delete:(req, res) => {
        const categoryChild_id = req.params.categoryChild_id;
        categoryChild.delete(categoryChild_id, (result) => {
            res.send(result);
        });
    },
}