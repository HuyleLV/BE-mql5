const Product = require("../model/product");
const fs = require("fs-extra");

module.exports = {
  getAll: (req, res) => {
    Product.getAll((result) => {
      res.send(result);
    });
  },

  getById: (req, res) => {
    const product_id = req.params.product_id;
    Product.getById(product_id, (result) => {
      res.send(result);
    });
  },

  getByCategoryChild: (req, res) => {
    const categoryChild_id = req.params.categoryChild_id;
    Product.getByCategoryChild(categoryChild_id, (result) => {
      res.send(result);
    });
  },

  create: (req, res) => {
    const { file } = req;

    if (!file) return res.status(400).json({ message: "File not fund!" });
    return res
      .status(201)
      .json({ message: "Upload successful!", url: `/${file?.path}` });
  },

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
};
