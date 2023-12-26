const formatDate = require('../common/formatDate');
const db = require("../common/connect");
const { findByEmail, create, getUserbyEmail } = require('../model/user');

module.exports = function (router) {
    const passport = require('passport');
    require("../common/auth");

    router.get('/auth/google',
        passport.authenticate('google', { scope:
            [ 'email', 'profile' ] }
    ));
    
    router.get(
      "/auth/google/callback",
      passport.authenticate("google", { session: false }),
      async (req, res) => {
        try {
          const { displayName, email } = req.user;
          const photos = req.user.photos[0].value;
          const create_at = formatDate(new Date());
          let user = await findByEmail(email);
          const newUser = { displayName, email, photos, create_at };
          if (user && user?.length === 0) user = await create(newUser);
          const data = await getUserbyEmail(email);
          res.cookie('user', data);
          return res.redirect(`${process.env.CLIENT_URL}`);
        } catch (e) {
          res.status(500).json({ message: 'error server!'})
        }
      }
    );

    router.get("/auth/google/failure", (req, res) => {
        return res.redirect(`${process.env.CLIENT_URL}`);
    });

    router.get("/auth/logout", (req, res) => {
      res.clearCookie('user');
      return res.redirect(`${process.env.CLIENT_URL}`);
  });

};