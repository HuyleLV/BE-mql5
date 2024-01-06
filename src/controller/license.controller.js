const formatDate = require("../common/formatDate");
const license = require("../model/license");

module.exports = {

    getAll: async (req, res) => {
        const result = await license.findAll();
        return res.send(result);
    },

    create: async (req, res) => {
        try {
      
         const numWeeks = 2;
         const now = new Date();
         
         const mt4_account = req.body.mt4_account;
         const active_date = formatDate(new Date());
         const end_date = formatDate(new Date());
         const active_status = 1;
         const product_id = req.body.product_id;
         const brocker_name = req.body.brocker_name;
         const account_type = req.body.account_type;
         const account_balance = req.body.account_balance;
         const account_profit = req.body.account_profit;
         const create_at = formatDate(new Date());
        
         const findMT4Acc = await license.getMT4Acc(mt4_account);
         if(findMT4Acc?.length !== 0) {
            
            const upDateLicense = {account_balance,account_profit,mt4_account};
            await license.update(upDateLicense);
            const getLicen = await license.getActiveLicensebyMT4(mt4_account);
            if(getLicen?.length !== 0){
                return res.status(400).json({ message: 'Account đã tồn tại license đang active!', status: 1})
            }else{
                return res.status(400).json({ message: 'Account đã tồn tại license đã hết hiệu lực!', status: 2})
            }
         } 
         const newLicense = {mt4_account, active_date, end_date, active_status, product_id, brocker_name, account_type, account_balance,account_profit,create_at}
         await license.create(newLicense);
         return res.status(200).json({ message: 'Account mới đã tạo license thành công!', status: 0})
        } catch (e) {
         return res.status(500).json({ message: e.toString()})
        }
     },
     update: async (req, res) => {
        const mt4_account = req.body.mt4_account;
        const account_balance = req.body.account_balance;
        const account_profit = req.body.account_profit;
        await license.update(account_balance, account_profit,mt4_account);
        return res.status(200).json({ message: 'Cập nhập thành công!'})
    },

    checkLicense: async (req, res) => {
        try {
         const numWeeks = 2;
         const now = new Date();
         
         const mt4_account = req.params.mt4_account;
         const active_date = formatDate(new Date());
         const end_date = formatDate(new Date());
         const active_status = 1;
         const product_id = req.params.product_id;
         const brocker_name = req.params.brocker_name;
         const account_type = req.params.account_type;
         const account_balance = req.params.account_balance;
         const account_profit = req.params.account_profit;
         const create_at = formatDate(new Date());
              
         const findMT4Acc = await license.getMT4Acc(mt4_account);
         //Nếu acc mt4 không tồn tại trong bảng license thì add mới  
         console.log(findMT4Acc?.length);
         console.log(mt4_account);
         if(findMT4Acc?.length === 0)  {
            const _license = {mt4_account, active_date, end_date, active_status, product_id, brocker_name, account_type, account_balance,account_profit,create_at}
            await license.create(_license);
            return res.status(200).json({ status: 'Đã add account với free license 1 tuần!'})
         }else{
         //Nếu acc mt4 đã tồn tại trong bảng license kiểm tra license đó active 
         //Nếu active = yes trạng thái active = yes
         //Nếu active = no thì trả về trạng thái là hết license, no
         
            const actLicense  = await license.checkLicenseByAcc(mt4_account);
            if(actLicense?.length === 0)  {
                return res.status(200).json({ message: 'license đã hết hạn', status: 0});
            }else{
                return res.status(200).json({ message: 'license vẫn agc ', status: 1});
            }
          
         }
        
        } catch (e) {
         return res.status(500).json({ message: e.toString()})
        }
    },
    getLicenseByMT4Account: async (req, res) => {
        const mt4acc = req.params.mt4_account;
        console.log(mt4acc);
        const data = await license.getLicensebyMT4(mt4acc);
        return res.send(data);
    },
    
}