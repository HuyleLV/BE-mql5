const formatDate = require("../common/formatDate");
const db = require("../common/connect");
const { findByEmail, create, getUserbyEmail } = require("../model/user");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const user = require("../model/user");

module.exports = function (router) {
  const passport = require("passport");
  require("../common/auth");

  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

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
        res.cookie("user", data);
        return res.redirect(`${process.env.CLIENT_URL}`);
      } catch (e) {
        res.status(500).json({ message: "error server!" });
      }
    }
  );

  router.get("/auth/google/failure", (req, res) => {
    return res.redirect(`${process.env.CLIENT_URL}`);
  });

  router.get("/auth/logout", (req, res) => {
    res.clearCookie("user");
    return res.redirect(`${process.env.CLIENT_URL}`);
  });

  router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const findUser = await user.findByEmail(email);
      console.log("user", findUser);
      if (findUser && findUser?.length === 0)
        return res.status(300).json({ message: "Not fund user!" });

      if (password !== findUser[0].password)
        return res.status(300).json({ message: "Not fund user!" });

      return res.status(200).json({ data: findUser }); 
    } catch (e) {
      return res.status(500).json({ message: "Error server!" });
    }
  });

  router.get("/auth/send-mail", async (req, res) => {
    try {
      const email = req.query.email;
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const password = await randomstring.generate({
        charset: "alphabetic",
        length: 8,
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "MQL5: Registration completed successfully",
        html: `
      <html>
      <body>
          <h2>Registration completed successfully</h2>
          <div>
            <span>Login:</span> ${email}
          </div>
          <div>
             <span>Password:</span> ${password}
          </div>
      </body>
      </html>  
      `,
      };

      await transporter.sendMail(mailOptions, async (e, info) => {
        if (e) {
          console.log(e);
          return res.status(300).json({ message: e });
        } else {
          console.log(info);
          await user.updatePassword(password, email);
          return res
            .status(200)
            .json({ message: "Vui lòng kiểm tra email của bạn!" });
        }
      });
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  });
};
