const express = require("express");
const session = require("express-session");
const compression = require("compression")

const db = require("./models");

const app = express();

app.use(compression());
app.use(express.static("public"));


app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));

require('dotenv').config()

// app.use(session({
//   secret: process.env.USER_SECRET,
//   // TODO replace with environment variable for production
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 2
//     //TODO add secure cookie for production
//   }
// }))

// const routes = require("/");


// app.use(routes);


const PORT = process.env.PORT || 3030;
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`Ahoy! Welcome aboard the http://localhost:${PORT}`);
  });
});
