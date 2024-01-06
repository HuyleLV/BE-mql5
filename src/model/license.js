const Conn = require("../common/connDefauld");
class License {
  findAll = () => {
    const sql = "SELECT * FROM license ORDER BY license_id DESC";
    return Conn.GetList(sql, []);
  };
  
  //insert a mt4 acc at first run
  create = (license) => {
    const sql = `INSERT INTO license (mt4_account, active_date, end_date, active_status,product_id, brocker_name,account_type,account_balance,account_profit,create_at) values (?, ?, ?, ?, ?,?,?,?,?,?)`;
    const value = [license.mt4_account, license.active_date, license.end_date, license.active_status,license.product_id, license.brocker_name, license.account_type,license.account_balance,license.account_profit,license.create_at];
    return Conn.Excute(sql, value);
  };

  //get MT4 Acc in table license by mt4_account
  getMT4Acc = (mt4_account) => {
    const sql = "SELECT * FROM license WHERE mt4_account=?";
    return Conn.GetList(sql, [mt4_account]);
  };
 //check active license by mt4account
  checkLicenseByAcc = (mt4_account) => {
    const sql = "SELECT * FROM license WHERE mt4_account=? AND active_status = 1";
    return Conn.GetList(sql, [mt4_account]);
  };

 //get active license by mt4 account
  getActiveLicensebyMT4 = (mt4_account) => {
    const sql = `SELECT * FROM license WHERE mt4_account=? AND active_status = 1`;
    return Conn.GetList(sql, [mt4_account]);
  };
  //Update account information 
  update = (account_balance, account_profit, mt4_account) => {
    console.log(account_profit);
    const sql = "UPDATE license SET account_balance=?, account_profit=? WHERE mt4_account=?";
    const value = [account_balance, account_profit, mt4_account];
    return Conn.Excute(sql, value);
  };
 
}
module.exports = new License();
