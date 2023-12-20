const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect(function (err) {
  if (err) throw err.stack;
  console.log("ket noi thanh cong");
});

module.exports = db;
