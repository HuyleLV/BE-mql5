const transfer = require("../model/transfer");
const formatDate = require("../common/formatDate");
module.exports = {

    getAll:(req, res) => {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        transfer.getAll(page, pageSize, (result) => {
            res.send(result);
        });
    },

    getById:(req, res) => {
        const transfer_id = req.params.transfer_id;
        transfer.getById(transfer_id, (result) => {
            res.send(result);
        });
    },

    getByIdUser:(req, res) => {
        const user_id = req.params.user_id;
        transfer.getByIdUser(user_id, (result) => {
            res.send(result);
        });
    },
    
    create:(req, res) => {
        const transfer_content = req.body.transfer_content;
        const transfer_price = req.body.transfer_price;
        const transfer_status = req.body.transfer_status;
        const transfer_image = req.body.transfer_image;
        const product_id = req.body.product_id;
        const create_at = formatDate(new Date());
        const create_by = req.body.create_by;
        transfer.create(transfer_content, transfer_price, transfer_status, transfer_image, product_id, create_at, create_by, (result) => {
            res.send(result);
        });
    },

    updateStatus:(req, res) => {
        const transfer_id = req.params.transfer_id;
        const transfer_status = req.body.transfer_status;
        transfer.updateStatus(transfer_id, transfer_status, (result) => {
            res.send(result);
        });
    },

    delete:(req, res) => {
        const transfer_id = req.params.transfer_id;
        transfer.delete(transfer_id, (result) => {
            res.send(result);
        });
    },
}