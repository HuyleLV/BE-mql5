require("dotenv").config();
require('./src/common/auth');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const session = require('express-session')
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

require("./src/route/category.router")(app);
require("./src/route/categoryChild.router")(app);
require("./src/route/product.router")(app);
require("./src/route/authLogin.router")(app);

app.listen(port);

console.log("RESTful API server started on: " + port);