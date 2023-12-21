

module.exports = {
    upload:(req, res) => {
        const { file } = req;
        const product_link = `/uploads/${file?.filename}`;

        return res.json(product_link);
    },
}