const db = require("../common/connect");

const categoryChild = (categorychild) => {
    this.categoryChild_id = categorychild.categoryChild_id;
    this.categoryChild_name = categorychild.categoryChild_name;
    this.categoryChild_description	 = categorychild.categoryChild_description;
    this.categoryChild_link	 = categorychild.categoryChild_link;
    this.category_id = categorychild.category_id;
    this.create_at = categorychild.create_at;
    this.created_by = categorychild.created_by;
};

categoryChild.getAll = (callback) => {
    const sqlString = `SELECT * FROM categorychild ORDER BY categoryChild_id DESC`;
    db.query(sqlString, (err, result) => {
      if (err) {
        return callback(err);
      }
        callback(result);
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