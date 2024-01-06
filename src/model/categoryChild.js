const db = require("../common/connect");
const util = require('node:util');
const query = util.promisify(db.query).bind(db);

const categoryChild = (categorychild) => {
    this.categoryChild_id = categorychild.categoryChild_id;
    this.categoryChild_name = categorychild.categoryChild_name;
    this.categoryChild_description	 = categorychild.categoryChild_description;
    this.categoryChild_link	 = categorychild.categoryChild_link;
    this.category_id = categorychild.category_id;
    this.create_at = categorychild.create_at;
    this.created_by = categorychild.created_by;
};

categoryChild.getAll = async (page, pageSize, callback) => {
  
  let _page = page ? page : 1;
  let _limit = Number(pageSize);
  let _start = (_page - 1) * _limit;

  let rowData = await query("SELECT COUNT(*) as total FROM categorychild");
  let totalRow = rowData[0].total;
  let totalPage = Math.ceil(totalRow/_limit);

  const sqlString = `SELECT * FROM categorychild 
    INNER JOIN category ON category.category_id = categorychild.category_id
    INNER JOIN user ON user.user_id = categorychild.create_by
    ORDER BY categorychild.categoryChild_id DESC`;
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

categoryChild.getById = (categoryChild_id, callback) => {
  const sqlString = `SELECT * FROM categorychild WHERE categoryChild_id =?`;
  db.query(sqlString, categoryChild_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

categoryChild.getProductById = async (page, pageSize, category_id, categoryChild_id, callback) => {

  let _page = page ? page : 1;
  let _limit = Number(pageSize);
  let _start = (_page - 1) * _limit;

  let rowData = await query(`SELECT COUNT(*) as total, category.category_name, categorychild.categoryChild_name
    FROM categorychild 
    INNER JOIN category ON category.category_id = categorychild.category_id
    INNER JOIN product ON product.categoryChild_id = categorychild.categoryChild_id
    WHERE category.category_id = ${category_id} AND categorychild.categoryChild_id = ${categoryChild_id}`);

  let totalRow = rowData[0].total;
  let totalPage = Math.ceil(totalRow/_limit);

  const sqlString = `SELECT product.*, categorychild.*,(SELECT ROUND(AVG(comment_star)) FROM comment WHERE product_id = product.product_id) AS average
    FROM categorychild 
    INNER JOIN category ON category.category_id = categorychild.category_id
    INNER JOIN product ON product.categoryChild_id = categorychild.categoryChild_id
    WHERE category.category_id = ? AND categorychild.categoryChild_id = ?
    ORDER BY product.product_id DESC
    LIMIT ?,?`;
  db.query(sqlString, [category_id, categoryChild_id, _start, _limit], (err, result) => {
    if (err) {
      return callback(err);
    }
    const value= {
      category_name: rowData[0].category_name,
      categoryChild_name: rowData[0].categoryChild_name,
      data: result,
      total: totalRow,
      totalPage: totalPage
    }
    callback(value);
  });
}

categoryChild.create = (categoryChild_name, categoryChild_description, categoryChild_link, category_id, create_at, create_by, callback) => {
  const sqlString = `INSERT INTO categorychild(categoryChild_name, categoryChild_description, categoryChild_link, category_id, create_at, create_by) 
                      VALUES (?,?,?,?,?,?)`;
  db.query(sqlString, [categoryChild_name, categoryChild_description, categoryChild_link, category_id, create_at, create_by], (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

categoryChild.update = (categoryChild_id, categoryChild_name, categoryChild_description, categoryChild_link, category_id, create_by, callback) => {
  const sqlString = `UPDATE categorychild SET categoryChild_name=?, categoryChild_description=?,categoryChild_link=?, category_id=?, create_by=? WHERE categoryChild_id=?`;
  db.query(sqlString, [categoryChild_name, categoryChild_description, categoryChild_link, category_id, create_by, categoryChild_id], (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

categoryChild.delete = (categoryChild_id, callback) => {
  const sqlString = `DELETE FROM categorychild WHERE categoryChild_id=?`;
  db.query(sqlString, categoryChild_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

module.exports = categoryChild;