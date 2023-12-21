

module.exports = {
    upload:(req, res) => {
        const { file } = req;

        if (file.mimetype.includes("image")) {
            return res.json(`/uploads/image/${file.filename}`);
          }else if (file.mimetype.includes("application")) {
            return res.json(`/uploads/application/${file.filename}`);
          }else {
            return res.json(`/uploads/other/${file.filename}`);
          }

        
    },
}