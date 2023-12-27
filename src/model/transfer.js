const db = require("../common/connect");

const Transfer = (transfer) => {
    this.transfer_id = transfer.transfer_id;
    this.transfer_content = transfer.transfer_content;
    this.transfer_price = transfer.transfer_price;
    this.transfer_status = transfer.transfer_status;
    this.product_id = transfer.product_id;
    this.create_at = transfer.create_at;
    this.create_by = transfer.create_by;
};

Transfer.getAll = (callback) => {
    const sqlString = `SELECT * FROM transfer 
                    INNER JOIN user ON user.user_id = transfer.create_by
                    ORDER BY transfer_id DESC`;
    db.query(sqlString, (err, result) => {
      if (err) {
        return callback(err);
      }
        callback(result);
    });
}

Transfer.getById = (transfer_id, callback) => {
  const sqlString = `SELECT * FROM transfer 
                    INNER JOIN user ON user.user_id = transfer.create_by
                    WHERE transfer.transfer_id =?`;
  db.query(sqlString, transfer_id, (err, result) => {
    if (err) {
      return callback(err);
    }
      callback(result);
  });
}

Transfer.create = (transfer_content, transfer_price, transfer_status, product_id, create_at, create_by, callback) => {
  const sqlString = `INSERT INTO transfer(transfer_content, transfer_price, transfer_status, product_id, create_at, create_by) 
                      VALUES (?,?,?,?,?,?)`;
  db.query(sqlString, [transfer_content, transfer_price, transfer_status, product_id, create_at, create_by], (err, result) => {
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