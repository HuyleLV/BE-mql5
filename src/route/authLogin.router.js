const formatDate = require('../common/formatDate');
const db = require("../common/connect");

module.exports = function (router) {
    const passport = require('passport');
    require("../common/auth");

    function isLogin (req, res, next) {
        req.user ? next() : res.sendStatus(401);
    }

    router.get('/auth/google',
        passport.authenticate('google', { scope:
            [ 'email', 'profile' ] }
    ));
    
    router.get(
      "/auth/google/callback",
      passport.authenticate("google", { session: false, successRedirect: `${process.env.CLIENT_URL}` }),
      (req, res) => {
        
        const { displayName, email } = req.user;
        const photos = req.user.photos[0].value;
        const create_at = formatDate(new Date());

        const sqlCheck = `SELECT * FROM user WHERE email=?`;
        db.query(sqlCheck, [email], (err, result) => {
          if (err) return res.send(err);
          if (result.length === 0) {
            const sql = `INSERT INTO user(displayName, email, photos, create_at) VALUES (?,?,?,?)`;
            db.query(
              sql,
              [displayName, email, photos, create_at],
              (err, result) => {
                if (err) return res.send(err);
                const sqlUser = `SELECT * FROM user WHERE email=?`;
                db.query(sqlUser, email, (err, result) => {
                    err ? res.send(err) : res.send(result);
                });
              }
            );
          } else {
            const sqlUser = `SELECT * FROM user WHERE email=?`;
            db.query(sqlUser, email, (err, result) => {
              err ? res.send(err) : res.send(result);
            });
          }
        });

        const newUser = { displayName, email, photos }
        return res.cookie('userData', JSON.stringify(newUser), { httpOnly: true });
        
      }
    );

    router.get("/auth/profile", (req, res) => {
        const userDataCookie = req.cookies.userData;
        if (userDataCookie) {
            return res
            .status(200)
            .json({ data: userDataCookie });
        } else {
            return res.status(401).json({ message: 'Login has expired!'});
        }
    });

    router.get("/auth/google/failure", (req, res) => {
        return res.redirect('https://www.geeksforgeeks.org');
    });

};