const categoryChild = require("../model/categoryChild");

module.exports = {

    getAll:(req, res) => {
        categoryChild.getAll((result) => {
            res.send(result);
        });
    },

    getById:(req, res) => {
        const categoryChild_id = req.params.categoryChild_id;
        categoryChild.getById(categoryChild_id, (result) => {
            res.send(result);
        });
    },
    
    create:(req, res) => {
        const categoryChild_name = req.body.categoryChild_name;
        const categoryChild_description = req.body.categoryChild_description;
        const category_id = req.body.category_id;
        const create_at = formatDate(new Date());
        const create_by = req.body.create_by;
        categoryChild.create(categoryChild_name, categoryChild_description, category_id, create_at, create_by, (result) => {
            res.send(result);
        });
    },

    update:(req, res) => {
        const categoryChild_id = req.params.categoryChild_id;
        const categoryChild_name = req.body.categoryChild_name;
        const categoryChild_description = req.body.categoryChild_description;
        const category_id = req.body.category_id;
        const create_at = formatDate(new Date());
        const create_by = req.body.create_by;
        categoryChild.update(categoryChild_id, categoryChild_name, categoryChild_description, category_id, create_at, create_by, (result) => {
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