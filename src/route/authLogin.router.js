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
    
    router.get('/auth/google/callback',
        passport.authenticate( 'google', {
            successRedirect: '/auth/protected',
            failureRedirect: '/auth/google/failure'
    }));

    router.get('/auth/google/failure',(req, res) => {
        res.send("something !");
    })

    router.get('/auth/protected', isLogin,(req, res) => {
        const displayName = req.user.displayName;
        const email = req.user.email;
        const photos = req.user.photos[0].value;
        const create_at = formatDate(new Date());

        const sqlCheck = `SELECT * FROM user WHERE email=?`;
        db.query(sqlCheck, [email], (err, result) => {
            if (err) {
              return res.send(err);
            }
            
            if(result.length === 0){
                const sql = `INSERT INTO user(displayName, email, photos, create_at) VALUES (?,?,?,?)`;
                db.query(sql, [displayName, email, photos, create_at], (err, result) => {
                    if (err) {
                        return res.send(err);
                    }
                    const sqlUser = `SELECT * FROM user WHERE email=?`;
                    db.query(sqlUser, email, (err, result) => {
                        if (err) {
                            return res.send(err);
                        }
                        res.send(result);
                    });
                });
            }else{
                const sqlUser = `SELECT * FROM user WHERE email=?`;
                db.query(sqlUser, email, (err, result) => {
                    if (err) {
                        return res.send(err);
                    }
                    res.send(result);
                });
            }
            
        });

    })
};