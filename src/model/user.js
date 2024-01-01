const Conn = require("../common/connDefauld");
class User {
  findAll = (_start, _limit) => {
    const sql = "SELECT * FROM user ORDER BY user_id DESC LIMIT ?,?";
    return Conn.GetList(sql, [_start, _limit]);
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
  createByAdmin = (user) => {
    const sql = `INSERT INTO user (displayName, email, password, photos, phone, role, create_at) values (?, ?, ?, ?, ?, ?, ?)`;
    const value = [user.displayName, user.email, user.password, user.photos, user.phone, user.role, user.create_at];
    return Conn.Excute(sql, value);
  };
  getUserId = (id) => {
    const sql = "SELECT * FROM user WHERE user_id=?";
    return Conn.GetOne(sql, [id]);
  };
  getUserbyEmail = (email) => {
    const sql = `SELECT * FROM user WHERE email=?`;
    return Conn.GetOne(sql, [email]);
  };
  updateProfile = (password, phone, id) => {
    const sql = "UPDATE user SET password=?, phone=? WHERE user_id=?";
    const value = [password, phone, id];
    return Conn.Excute(sql, value);
  };
  updatePassword = (password, email) => {
    const sql = "UPDATE user SET password=? WHERE email=?";
    const value = [password, email];
    return Conn.Excute(sql, value);
  };
  updateRole = (role, id) => {
    const sql = "UPDATE user SET role=? WHERE user_id=?";
    const value = [role, id];
    return Conn.Excute(sql, value);
  };
  delete = (id) => {
    const sql = "DELETE FROM user WHERE user_id=?";
    const value = [id];
    return Conn.Excute(sql, value);
  };
}
module.exports = new User();
