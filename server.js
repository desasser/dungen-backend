const express = require("express");
const compression = require("compression")

const db = require("./models");

const app = express();

app.use(compression());
app.use(express.static("public"));


app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));

require('dotenv').config()

// USER AUTHENTICATION GOES HERE


// User routes
const userRoutes = require("./controllers/userController.js");
app.use(userRoutes);

// Environment routes
const environmentRoutes = require("./controllers/environmentController.js");
app.use(environmentRoutes);

// Map routes
const mapRoutes = require("./controllers/mapController.js");
app.use(mapRoutes);

// Map/Tile routes
const mapTileRoutes = require("./controllers/mapTileController.js");
app.use(mapTileRoutes);

// Tile routes
const tileRoutes = require("./controllers/tileController.js");
app.use(tileRoutes);

// Frontend routes
const frontEndRoutes = require("./controllers/frontEndController.js");
app.use(frontEndRoutes);


const PORT = process.env.PORT || 3030;
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log(`Ahoy! Welcome aboard the http://localhost:${PORT}`);
  });
});
