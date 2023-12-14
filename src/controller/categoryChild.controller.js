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
    
    // createCategory:(req, res) => {
    //     const category_name = req.body.category_name;
    //     Category.createCategory(category_name, (result) => {
    //         res.send(result);
    //     });
    // },

    // updateCategory:(req, res) => {
    //     const category_id = req.params.category_id;
    //     const category_name = req.body.category_name;
    //     Category.updateCategory(category_id, category_name, (result) => {
    //         res.send(result);
    //     });
    // },

    // deleteCategoryById:(req, res) => {
    //     const category_id = req.params.category_id;
    //     Category.deleteCategoryById(category_id, (result) => {
    //         res.send(result);
    //     });
    // },
}