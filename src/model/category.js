const db = require("../common/connect");
const util = require('node:util');
const query = util.promisify(db.query).bind(db);

const Category = (category) => {
    this.category_id = category.category_id;
    this.category_name = category.category_name;
    this.category_description = category.category_description;
    this.category_link = category.category_link;
    this.create_at = category.create_at;
    this.create_by = category.create_by;
};

Category.getAll = (callback) => {
  const sqlString = `SELECT * FROM category ORDER BY category_id DESC`;
  db.query(sqlString, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const promises = result.map((category) => {
        return new Promise((resolveChild, rejectChild) => {
          const sqlStringChild = `SELECT * FROM categorychild WHERE category_id = ?`;
          db.query(sqlStringChild, category.category_id, (err1, result1) => {
            if (err1) {
              rejectChild(err1);
            } else {
              category.categoryChild = result1;
              resolveChild();
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

Category.getAllAdmin = async (page, pageSize, callback) => {

  let _page = page ? page : 1;
  let _limit = Number(pageSize);
  let _start = (_page - 1) * _limit;

  let rowData = await query("SELECT COUNT(*) as total FROM category");
  let totalRow = rowData[0].total;
  let totalPage = Math.ceil(totalRow/_limit);

  const sqlString = `SELECT * FROM category 
    INNER JOIN user ON user.user_id = category.create_by
    ORDER BY category_id DESC LIMIT ?,?`;
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

Category.getByProduct = async (category_id, page, pageSize, callback) => {

  let _page = page ? page : 1;
  let _limit = Number(pageSize);
  let _start = (_page - 1) * _limit;

  let rowData = await query(`SELECT COUNT(*) as total
    FROM categorychild 
    INNER JOIN category ON category.category_id = categorychild.category_id
    INNER JOIN product ON product.categoryChild_id = categorychild.categoryChild_id
    WHERE category.category_id = ${category_id}`);

  let totalRow = rowData[0].total;
  let totalPage = Math.ceil(totalRow/_limit);

  const sqlString = `SELECT product.*, categorychild.*, (SELECT ROUND(AVG(comment_star)) FROM comment WHERE product_id = product.product_id) AS average
    FROM categorychild 
    INNER JOIN category ON category.category_id = categorychild.category_id
    INNER JOIN product ON product.categoryChild_id = categorychild.categoryChild_id
    WHERE category.category_id = ? 
    ORDER BY product.product_id DESC
    LIMIT ?,?`;
  db.query(sqlString, [category_id, _start, _limit], (err, result) => {
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

Category.getProductById = async (category_id, page, pageSize, callback) => {

  let _page = page ? page : 1;
  let _limit = Number(pageSize);
  let _start = (_page - 1) * _limit;

  let rowData = await query(`SELECT COUNT(*) as total, category.category_name
    FROM categorychild 
    INNER JOIN category ON category.category_id = categorychild.category_id
    INNER JOIN product ON product.categoryChild_id = categorychild.categoryChild_id
    WHERE category.category_id = ${category_id}`);

  let totalRow = rowData[0].total;
  let totalPage = Math.ceil(totalRow/_limit);

  const sqlString = `SELECT product.*, categorychild.*,(SELECT ROUND(AVG(comment_star)) FROM comment WHERE product_id = product.product_id) AS average
    FROM categorychild 
    INNER JOIN category ON category.category_id = categorychild.category_id
    INNER JOIN product ON product.categoryChild_id = categorychild.categoryChild_id
    WHERE category.category_id = ? 
    ORDER BY product.product_id DESC
    LIMIT ?,?`;
  db.query(sqlString, [category_id, _start, _limit], (err, result) => {
    if (err) {
      return callback(err);
    }
    const value= {
      category_name: rowData[0].category_name,
      data: result,
      total: totalRow,
      totalPage: totalPage
    }
    callback(value);
  });
}

Category.getById = (category_id, callback) => {
  const sqlString = `SELECT * FROM category WHERE category_id =?`;
  db.query(sqlString, category_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Category.create = (category_name, category_description, category_link, create_at, create_by, callback) => {
  const sqlString = `INSERT INTO category(category_name, category_description, category_link, create_at, create_by) 
                      VALUES (?,?,?,?,?)`;
  db.query(sqlString, [category_name, category_description, category_link, create_at, create_by], (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Category.update = (category_id, category_name, category_description, category_link, create_by, callback) => {
  const sqlString = `UPDATE category SET category_name=?, category_description=?, category_link=?, create_by=? WHERE category_id=?`;
  db.query(sqlString, [category_name, category_description, category_link, create_by, category_id], (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Category.delete = (category_id, callback) => {
  const sqlString = `DELETE FROM category WHERE category_id=?`;
  db.query(sqlString, category_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

module.exports = Category;