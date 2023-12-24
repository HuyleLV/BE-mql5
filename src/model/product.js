const db = require("../common/connect");

const Product = (product) => {
    this.product_id = product.product_id;
    this.product_name = product.product_name;
    this.product_slug = product.product_slug;
    this.product_description = product.product_description;
    this.product_price = product.product_price;
    this.product_image = product.product_image;
    this.categoryChild_id = product.categoryChild_id;
    this.product_version = product.product_version;
    this.product_activations = product.product_activations;
    this.create_at = product.create_at;
    this.create_by = product.create_by;
};

Product.getAll = (callback) => {
    const sqlString = `SELECT * FROM product ORDER BY product_id DESC`;
    db.query(sqlString, (err, result) => {
      if (err) {
        return callback(err);
      }
        callback(result);
    });
}

Product.getById = (product_id, callback) => {
  const sqlString = `SELECT * FROM product 
  INNER JOIN categorychild ON categorychild.categoryChild_id = product.categoryChild_id
  WHERE product.product_id = ?`;
  db.query(sqlString, product_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Product.getByCategoryChild = (categoryChild_id, callback) => {
  const sqlString = `SELECT * FROM product WHERE categoryChild_id=? ORDER BY product_id DESC`;
  db.query(sqlString, categoryChild_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Product.create = (
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
  callback) => {
  const sqlString = `INSERT INTO product(
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
    create_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
  db.query(sqlString, [
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
    create_by,], (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Product.update = (
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
  callback) => {
  const sqlString = `UPDATE product SET 
  product_name=?, 
  product_slug=?, 
  product_description=?,
  product_price=?, 
  product_link=?,
  product_image=?, 
  categoryChild_id=?, 
  product_version=?, 
  create_at=?, 
  create_by=? WHERE product_id=?`;
  db.query(sqlString, [
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
    product_id], (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Product.delete = (product_id, callback) => {
  const sqlString = `DELETE FROM product WHERE product_id = ?`;
  db.query(sqlString, product_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

module.exports = Product;