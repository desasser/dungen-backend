const express = require("express");
const router = express.Router();

const db = require("../models");

require('dotenv').config()

// get all tiles
router.get("/api/tiles", function (req, res) {
  db.Tile.findAll({
    include: [ db.TileSet ]
  })
  .then(function (data) {
      res.send(data)
  }).catch(function (error) {
      res.status(500).json(error)
  });
});

// get all tiles by TILE-SET
router.get("/api/tiles/:tileSetId", function (req, res) {
  db.Tile.findAll({
    where: { TileSetId: req.params.tileSetId },
    include: [ db.TileSet ]
  })
  .then(function (data) {
      res.send(data)
  }).catch(function (error) {
      res.status(500).json(error)
  });
});

//CREATE new Tile
router.post("/api/tile", function (req, res) {
  console.log(req.body)
  db.Tile.create({
      image_url: req.body.image_url,
      TileSetId: req.body.tileSetId
  }).then(function (data) {
      console.log(data)
      res.json(data)
  }).catch(function (error) {
      res.status(500).json(error)
  });
});

//UPDATE Tile
router.put("/api/tile/:id", function (req, res) {
  db.Tile.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(updatedTile => {
      res.json(updatedTile)
    }).catch(error => {
      res.status(500).send(error.message)
    })
})

// DELETE Tile
router.delete("/api/tile/:id", function (req, res) {
  // JT validation needed
  db.Tile.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (deletedTile) {
    res.json(deletedTile)
  }).catch(error => {
    res.status(500).send(error.message)
  })
})

module.exports = router;