const formatDate = require("../common/formatDate");
const user = require("../model/user");

module.exports = {

    getAll: async (req, res) => {
        const result = await user.findAll();
        return res.send(result);
    },

    getById: async (req, res) => {
        const user_id = req.params.user_id;
        const data = await user.getUserId(user_id);
        return res.send(data);
    },

    getByEmail: async (req, res) => {
        const email = req.params.email;
        const data = await user.findByEmail(email);
        return res.send(data);
    },

    loginAdmin: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const data = await user.findByEmail(email);
        
        if(password === data[0].password && data[0].role === 2){
            return res.status(200).json(data);
        } else {
            return res.status(500).json({ message: 'Tài khoản hoặc mật khẩu không đúng!'});
        }
    },
    
    create: async (req, res) => {
       try {
        const displayName = req.body.displayName;
        const email = req.body.email;
        const password = req.body.password;
        const photos = req.body.photos;
        const phone = req.body.phone;
        const role = req.body.role;
        const create_at = formatDate(new Date());
        const create_by = "huy";

        const findUser = await user.findByEmail(email);
        if(findUser?.length !== 0)  return res.status(400).json({ message: 'Email đã tồn tại!'})
        const newUser = {displayName, email, password, photos, phone, role, create_at, create_by}
        
        await user.createByAdmin(newUser);
        return res.status(200).json({ message: 'Đã tạo tài khoản thành công!'})
       } catch (e) {
        return res.status(500).json({ message: 'Error server!'})
       }

    },
    
    update: async (req, res) => {
        const user_id = req.params.user_id;
        const role = req.body.role;
        await user.updateRole(role, user_id);
        return res.status(200).json({ message: 'Cập nhập thành công!'})
    },

    updateProfile: async (req, res) => {
        const user_id = req.params.user_id;
        const password = req.body.password;
        const phone = req.body.phone;
        await user.updateProfile(password, phone, user_id);

        return res.status(200).json({ message: 'Đã cập nhật thông tin thành công!'})
    },

    delete: async (req, res) => {
        const user_id = req.params.user_id;
        await user.delete(user_id);

        return res.status(200).json({ message: 'Đã xóa thành công!'})
    },
}