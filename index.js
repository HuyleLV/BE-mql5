require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

require("./src/route/category.router")(app);
require("./src/route/categoryChild.router")(app);
require("./src/route/product.router")(app);

app.listen(port);

console.log("RESTful API server started on: " + port);