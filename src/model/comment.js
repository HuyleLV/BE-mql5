const db = require("../common/connect");
const util = require('node:util');
const query = util.promisify(db.query).bind(db);

const Comment = (comment) => {
    this.comment_id = comment.comment_id;
    this.comment_content = comment.comment_content;
    this.comment_star = comment.comment_star;
    this.product_id = comment.product_id;
    this.create_at = comment.create_at;
    this.created_by = comment.created_by;
};

Comment.getAll = async (page, pageSize, callback) => {

  let _page = page ? page : 1;
  let _limit = Number(pageSize);
  let _start = (_page - 1) * _limit;

  let rowData = await query(`SELECT COUNT(*) as total FROM comment
    INNER JOIN user ON user.user_id = comment.create_by
    INNER JOIN product ON product.product_id = comment.product_id`);
  let totalRow = rowData[0].total;
  let totalPage = Math.ceil(totalRow/_limit);

  const sqlString = `SELECT * FROM comment 
                  INNER JOIN user ON user.user_id = comment.create_by
                  INNER JOIN product ON product.product_id = comment.product_id
                  ORDER BY comment_id DESC LIMIT ?,?`;
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

Comment.getById = async (product_id, page, pageSize, callback) => {

  let _page = page ? page : 1;
  let _limit = Number(pageSize);
  let _start = (_page - 1) * _limit;

  let rowData = await query(`SELECT COUNT(*) as total FROM comment
    INNER JOIN user ON user.user_id = comment.create_by
    WHERE comment.product_id =${product_id}`);
  let totalRow = rowData[0].total;
  let totalPage = Math.ceil(totalRow/_limit);

  const sqlString = `SELECT * FROM comment 
                    INNER JOIN user ON user.user_id = comment.create_by
                    WHERE comment.product_id =?
                    ORDER BY comment.comment_id DESC LIMIT ?,?`;
  db.query(sqlString, [product_id, _start, _limit], (err, result) => {
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