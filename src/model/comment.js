const db = require("../common/connect");

const Comment = (comment) => {
    this.comment_id = comment.comment_id;
    this.comment_content = comment.comment_content;
    this.comment_star = comment.comment_star;
    this.product_id = comment.product_id;
    this.create_at = comment.create_at;
    this.created_by = comment.created_by;
};

Comment.getAll = (callback) => {
    const sqlString = `SELECT * FROM comment 
                    INNER JOIN user ON user.user_id = comment.create_by
                    ORDER BY comment_id DESC`;
    db.query(sqlString, (err, result) => {
      if (err) {
        return callback(err);
      }
        callback(result);
    });
}

Comment.getById = (product_id, callback) => {
  const sqlString = `SELECT * FROM comment 
                    INNER JOIN user ON user.user_id = comment.create_by
                    WHERE comment.product_id =?`;
  db.query(sqlString, product_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Comment.create = (comment_content, comment_star, product_id, create_at, create_by, callback) => {
  const sqlString = `INSERT INTO comment(comment_content, comment_star, product_id, create_at, create_by) 
                      VALUES (?,?,?,?,?)`;
  db.query(sqlString, [comment_content, comment_star, product_id, create_at, create_by], (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Comment.delete = (comment_id, callback) => {
  const sqlString = `DELETE FROM comment WHERE comment_id=?`;
  db.query(sqlString, comment_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

module.exports = Comment;