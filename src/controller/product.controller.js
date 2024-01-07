const formatDate = require("../common/formatDate");
const Product = require("../model/product");
const fs = require("fs-extra");

module.exports = {
  getAll: (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    Product.getAll(page, pageSize, (result) => {
      res.send(result);
    });
  },

  getAllMarket: (req, res) => {
    Product.getAllMarket((result) => {
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
    console.log(req.body);
    const product_name = req.body.product_name;
    const product_slug = req.body.product_slug;
    const product_description = req.body.product_description;
    const product_price = req.body.product_price;
    const product_link = req.body.product_link;
    const product_image = req.body.product_image;
    const categoryChild_id = req.body.categoryChild_id;
    const product_version = req.body.product_version;
    const product_activations = 0;
    const create_at = formatDate(new Date());
    const create_by = req.body.create_by;

    Product.create(
      product_name, 
      product_slug, 
      product_description, 
      product_price, 
      product_link, 
      product_image, 
      categoryChild_id, 
      product_version, 
      product_activations, 
      create_at, 
      create_by,
      (result) => {
        res.send(result);
    });
  },

  update: (req, res) => {
    const product_id = req.params.product_id;

    const product_name = req.body.product_name;
    const product_slug = req.body.product_slug;
    const product_description = req.body.product_description;
    const product_price = req.body.product_price;
    const product_link = req.body.product_link;
    const product_image = req.body.product_image;
    const categoryChild_id = req.body.categoryChild_id;
    const product_version = req.body.product_version;
    const create_at = formatDate(new Date());
    const create_by = req.body.create_by;

    Product.update(
      product_id,
      product_name, 
      product_slug, 
      product_description, 
      product_price, 
      product_link, 
      product_image, 
      categoryChild_id, 
      product_version, 
      create_at, 
      create_by,
      (result) => {
        res.send(result);
    });
  },

  updateActivation: (req, res) => {
    const product_id = req.params.product_id;
    const product_activations = req.body.product_activations;

    Product.updateActivation(
      product_id,
      product_activations, 
      (result) => {
        res.send(result);
    });
  },

  delete:(req, res) => {
      const product_id = req.params.product_id;
      Product.delete(product_id, (result) => {
          res.send(result);
      });
  },
};
