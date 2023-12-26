const Conn = require("../common/connDefauld");
class User {
  findAll = () => {
    const sql = "SELECT * FROM account";
    return Conn.GetList(sql, []);
  };
  findByEmail = (email) => {
    const sql = "SELECT * FROM user WHERE email=?";
    return Conn.GetList(sql, [email]);
  };
  create = (user) => {
    const sql = `INSERT INTO user (displayName, email, photos, role, create_at) values (?, ?, ?, ?, ?)`;
    const value = [user.displayName, user.email, user.photos, 1, user.create_at];
    return Conn.Excute(sql, value);
  };
  getUserId = (id) => {
    const sql = "SELECT id, email, phone FROM user WHERE id=?";
    return Conn.GetOne(sql, [id]);
  };
  getUserbyEmail = (email) => {
    const sql = `SELECT * FROM user WHERE email=?`;
    return Conn.GetOne(sql, [email]);
  };
  update = (user, id) => {
    const sql = "UPDATE user SET? WHERE id=?";
    const value = [user, id];
    return Conn.Excute(sql, value);
  };
  delete = (user, id) => {
    const sql = "DELETE FROM user WHERE id=?";
    const value = [user, id];
    return Conn.Excute(sql, value);
  };
}
module.exports = new User();
