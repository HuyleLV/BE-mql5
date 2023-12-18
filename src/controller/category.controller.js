const Category = require("../model/category");

module.exports = {

    getAll:(req, res) => {
        Category.getAll((result) => {  
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
        const create_at = formatDate(new Date());
        const create_by = req.body.create_by;
        Category.update(category_id, category_name, category_description, category_link, create_at, create_by, (result) => {
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