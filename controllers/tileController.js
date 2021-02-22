const express = require("express");
const router = express.Router();

const db = require("../models");

require('dotenv').config()

// get all tiles
router.get("/api/tiles", function (req, res) {
  db.Tile.findAll()
  .then(function (data) {
      res.send(data)
  }).catch(function (error) {
      res.status(500).json(error)
  });
});

// get all tiles by ENVIRONMENT
// router.get("/api/tiles/:environmentid", function (req, res) {
//   db.Tile.findAll({

//   })
//   .then(function (data) {
//       res.send(data)
//   }).catch(function (error) {
//       res.status(500).json(error)
//   });
// });