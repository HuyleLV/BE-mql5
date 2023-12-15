const db = require("../common/connect");

const Category = (category) => {
    this.category_id = category.category_id;
    this.category_name = category.category_name;
    this.category_description = category.category_description;
    this.create_at = category.create_at;
    this.create_by = category.create_by;
};

Category.getAll = (callback) => {
    const sqlString = `SELECT * FROM category
                        JOIN categorychild ON category.category_id = categorychild.category_id
                        ORDER BY category.category_id DESC`;
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

module.exports = Category;