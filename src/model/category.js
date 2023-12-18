const db = require("../common/connect");

const Category = (category) => {
    this.category_id = category.category_id;
    this.category_name = category.category_name;
    this.category_description = category.category_description;
    this.create_at = category.create_at;
    this.create_by = category.create_by;
};

Category.getAll = (callback) => {
  let arrChild = [];
  let arr = [];
  const sqlString = `SELECT * FROM category ORDER BY category_id DESC`;
  const sqlStringChild = `SELECT * FROM categorychild WHERE category_id =?`;
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err);
    }

    for (let i = 0; i < result.length; i++) {
      db.query(sqlStringChild, result[i].category_id,(err1, result1) => {
        if (err1) {
          return callback(err1);
        }
        for (let j = 0; j < result1.length; j++) {
          arrChild.push({
            categoryChild_id: result1[j].categoryChild_id,
            categoryChild_name: result1[j].categoryChild_name,
            categoryChild_description: result1[j].categoryChild_description,
            category_id: result1[j].category_id,
            create_at: result1[j].create_at,
            created_by: result1[j].created_by,
          });
      }
        
        arr.push({
          category_id: result[i].category_id,
          category_name: result[i].category_name,
          category_description: result[i].category_description,
          category_link: result[i].category_link,
          create_at: result[i].create_at,
          create_by: result[i].create_by,
          categoryChild: arrChild
        });
        console.log(arr);
      });
    };

    callback(arr);

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