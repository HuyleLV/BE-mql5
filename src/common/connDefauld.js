const connect = require("./connect");

class Conn {
  GetOne = async (sql, value) => {
    return new Promise((resolve, reject) => {
      connect.query(sql, value, (error, results) => {
        return results ? resolve(results[0]) : reject(error);
      });
    });
  };

  GetList = async (sql, value) => {
    return new Promise((resolve, reject) => {
      connect.query(sql, value, (error, results) => {
        return results ? resolve(results) : reject(error);
      });
    });
  };

  Excute = async (sql, value) => {
    return new Promise((resolve, reject) => {
      connect.query(sql, value, (error, results) => {
        return results ? resolve(results) : reject(error);
      });
    });
  };
}

module.exports = new Conn();
