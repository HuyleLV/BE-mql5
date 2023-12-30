const db = require("../common/connect");

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

Category.getAllAdmin = (callback) => {
  const sqlString = `SELECT * FROM category 
    INNER JOIN user ON user.user_id = category.create_by
    ORDER BY category_id DESC`;
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