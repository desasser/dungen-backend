const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios');
const { debugPort } = require("process");

require('dotenv').config()

// GET route for all MAPTILES
router.get("/api/maptiles", (req, res) => {
  db.MapTile.findAll()
    .then(mapTileData => res.json(mapTileData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// GET route for a single MAPTILE, will be a subset of the MAPTILE table
// Finds a MAP, then finds a subset of the MAPTILE table that matches the map fk
// Finds all tiles from tile fk and appends a column with image URLs
router.get("/api/maptiles/:id", (req, res) => {
  db.Map.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: db.MapTile,
      include: [db.Tile]
    }]
  })
    .then(mapTileData => res.json(mapTileData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// POST route for new MAPTILE
router.post("/api/maptiles", (req, res) => {
  db.MapTile.create(req.body)
    .then(mapTileData => res.json(mapTileData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// PUT route for updating a MAPTILE
router.put("/api/maptiles", (req, res) => {
  db.MapTile.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(mapTileData => res.json(mapTileData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// DELETE route for single MAPTILE
router.delete("/api/maptiles/:id", (req, res) => {
  db.MapTile.destroy({
    where: {
      id: req.params.id
    }
  }).then(mapTileData => res.json(mapTileData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
});

module.exports = router;