const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const Op = db.Sequelize.Op;

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

// GET all MAPTILES for a specific map
router.get('/api/maptiles/:mapId', (req, res) => {
  db.MapTile.findAll({ where: { MapId: req.params.mapId} })
  .then(mapTilesData => res.json(mapTilesData))
  .catch(err => res.status(500).send(err.message));
})

// GET route for a single MAPTILE, will be a subset of the MAPTILE table
// Finds a MAP, then finds a subset of the MAPTILE table that matches the map fk
// Finds all tiles from tile fk and appends a column with image URLs
router.get("/api/maptile/:id", (req, res) => {
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
router.post("/api/maptile", (req, res) => {
  db.MapTile.create(req.body)
    .then(mapTileData => res.json(mapTileData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// PUT route for updating a MAPTILE
router.put("/api/maptile", (req, res) => {
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

// ALTERNATE PUT route for updating a MAPTILE
router.put("/api/maptile/:id", (req, res) => {
  db.MapTile.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(mapTileData => res.json(mapTileData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// DELETE route for single MAPTILE
// providing an array of ids will delete all of them!
router.delete("/api/maptile/:id", (req, res) => {
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

// delete all maptiles in the provided array of ids
router.delete("/api/bulkdeletemaptiles/", (req, res) => {
  console.log("bulk delete maptiles", req.body)
  db.MapTile.destroy({
    where: {
      id: {[Op.in]: req.body}
    }
  })
  .then(deletedTiles => res.json(deletedTiles))
  .catch(err => {
    console.log(err);
    res.status(500).send(err.message)
  });
})

// delete all maptiles for a specific map id
router.delete("/api/deletemaptilebymap/:mapid", (req, res) => {
  db.MapTile.destroy({
    where: {
      MapId: req.params.mapid
    }
  }).then(mapTileData => res.json(mapTileData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
});

module.exports = router;