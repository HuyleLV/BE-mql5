const db = require("../common/connect");
const util = require('node:util');
const query = util.promisify(db.query).bind(db);

const Transfer = (transfer) => {
    this.transfer_id = transfer.transfer_id;
    this.transfer_content = transfer.transfer_content;
    this.transfer_price = transfer.transfer_price;
    this.transfer_status = transfer.transfer_status;
    this.transfer_image = transfer.transfer_image;
    this.product_id = transfer.product_id;
    this.create_at = transfer.create_at;
    this.create_by = transfer.create_by;
};

Transfer.getAll = async (page, pageSize, callback) => {

  let _page = page ? page : 1;
  let _limit = Number(pageSize);
  let _start = (_page - 1) * _limit;

  let rowData = await query("SELECT COUNT(*) as total FROM transfer");
  let totalRow = rowData[0].total;
  let totalPage = Math.ceil(totalRow/_limit);
    const sqlString = `SELECT * FROM transfer 
                    INNER JOIN user ON user.user_id = transfer.create_by
                    INNER JOIN product ON product.product_id = transfer.product_id
                    ORDER BY transfer_id DESC LIMIT ?,?`;
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

Transfer.getById = (transfer_id, callback) => {
  const sqlString = `SELECT * FROM transfer 
                    INNER JOIN user ON user.user_id = transfer.create_by
                    INNER JOIN product ON product.product_id = transfer.product_id
                    WHERE transfer.transfer_id =?
                    ORDER BY transfer_id DESC`;
  db.query(sqlString, transfer_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Transfer.getByIdUser = (user_id, callback) => {
  const sqlString = `SELECT * FROM transfer 
                    INNER JOIN user ON user.user_id = transfer.create_by
                    WHERE user.user_id =?
                    ORDER BY transfer_id DESC`;
  db.query(sqlString, user_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Transfer.create = (transfer_content, transfer_price, transfer_status, transfer_image, product_id, create_at, create_by, callback) => {
  const sqlString = `INSERT INTO transfer(transfer_content, transfer_price, transfer_status, transfer_image, product_id, create_at, create_by) 
                      VALUES (?,?,?,?,?,?,?)`;
  db.query(sqlString, [transfer_content, transfer_price, transfer_status, transfer_image, product_id, create_at, create_by], (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Transfer.updateStatus = (transfer_id, transfer_status, callback) => {
    const sqlString = `UPDATE transfer SET transfer_status=? WHERE transfer_id=?`;
    db.query(sqlString, [transfer_status, transfer_id], (err, result) => {
      if (err) {
        return callback(err);
      }
        callback(result);
    });
  }

Transfer.delete = (transfer_id, callback) => {
  const sqlString = `DELETE FROM transfer WHERE transfer_id=?`;
  db.query(sqlString, transfer_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

module.exports = Transfer;