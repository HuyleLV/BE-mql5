const db = require("../common/connect");
const util = require('node:util');
const query = util.promisify(db.query).bind(db);

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

Product.getAll = async (page, pageSize, callback) => {

  let _page = page ? page : 1;
  let _limit = Number(pageSize);
  let _start = (_page - 1) * _limit;

  let rowData = await query("SELECT COUNT(*) as total FROM product");
  let totalRow = rowData[0].total;
  let totalPage = Math.ceil(totalRow/_limit);

  const sqlString = `SELECT * FROM product 
    INNER JOIN user ON user.user_id = product.create_by
    ORDER BY product_id DESC LIMIT ?,?`;
  db.query(sqlString, [_start, _limit], (err, result) => {
    if (err) {
      return callback(err);
    }
    const value= {
      data: result,
      total: totalRow,
      totalPage: totalPage
    }
    callback(value);
  });
}

Product.getAllMarket = (callback) => {
  
  const sqlString = `SELECT * FROM category ORDER BY category_id DESC`;
  db.query(sqlString, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const promises = result.map((category) => {
        return new Promise((resolveProduct, rejectChild) => {
          const sqlStringProduct = `SELECT product.*, categorychild.*, (SELECT ROUND(AVG(comment_star)) FROM comment WHERE product_id = product.product_id) AS average
            FROM categorychild 
            INNER JOIN category ON category.category_id = categorychild.category_id
            INNER JOIN product ON product.categoryChild_id = categorychild.categoryChild_id
            WHERE category.category_id = ? 
            ORDER BY product.product_id DESC
            LIMIT 12`;
          db.query(sqlStringProduct, category.category_id, (err1, result1) => {
            if (err1) {
              rejectChild(err1);
            } else {
              category.product = result1;
              resolveProduct();
            }
          });
        });
      });

      Promise.all(promises)
          .then(() => {
            callback(result);
          })
          .catch((error) => {
            callback(error);
          });
    }
  });
}

Product.getById = (product_id, callback) => {
  const sqlString = `SELECT product.*, category.*, categorychild.*, user.*, product.create_at, product.create_by,
  (SELECT ROUND(AVG(comment_star)) FROM comment WHERE product_id = product.product_id) AS average
  FROM product 
    INNER JOIN categorychild ON categorychild.categoryChild_id = product.categoryChild_id
    INNER JOIN category ON category.category_id = categorychild.category_id
    INNER JOIN user ON user.user_id = product.create_by
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