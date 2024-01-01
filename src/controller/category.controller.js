const Category = require("../model/category");
const formatDate = require("../common/formatDate");

module.exports = {

    getAll:(req, res) => {
        Category.getAll((result) => {  
            res.send(result);
        });
    },

    getAllAdmin:(req, res) => {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        Category.getAllAdmin(page, pageSize, (result) => {  
            res.send(result);
        });
    },

    getProductById:(req, res) => {
        const category_id = req.params.category_id;
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        Category.getProductById(category_id, page, pageSize, (result) => {
            res.send(result);
        });
    },

    getById:(req, res) => {
        const category_id = req.params.category_id;
        Category.getById(category_id, (result) => {
            res.send(result);
        });
    },
    
    create:(req, res) => {
        const category_name = req.body.category_name;
        const category_description = req.body.category_description;
        const category_link = req.body.category_link;
        const create_at = formatDate(new Date());
        const create_by = req.body.create_by;
        Category.create(category_name, category_description, category_link, create_at, create_by, (result) => {
            res.send(result);
        });
    },

    update:(req, res) => {
        const category_id = req.params.category_id;
        const category_name = req.body.category_name;
        const category_description = req.body.category_description;
        const category_link = req.body.category_link;
        const create_by = req.body.create_by;
        Category.update(category_id, category_name, category_description, category_link, create_by, (result) => {
            res.send(result);
        });
    },

    delete:(req, res) => {
        const category_id = req.params.category_id;
        Category.delete(category_id, (result) => {
            res.send(result);
        });
    },
}