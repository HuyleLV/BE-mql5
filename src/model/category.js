const db = require("../common/connect");

const Category = (category) => {
    this.category_id = category.category_id;
    this.category_name = category.category_name;
    this.category_description = category.category_description;
    this.create_at = category.create_at;
    this.create_by = category.create_by;
};

Category.getAll = (callback) => {
    const sqlString = `SELECT * FROM category ORDER BY category_id DESC`;
    db.query(sqlString, (err, result) => {
      if (err) {
        return callback(err);
      }
        callback(result);
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

module.exports = Category;