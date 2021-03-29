const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios');
const { debugPort } = require("process");

require('dotenv').config()

// GET route for all MAPTILES
router.get("/api/mapencounters", (req, res) => {
  db.mapEncounter.findAll()
    .then(mapEncounterData => res.json(mapEncounterData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// GET route for a single mapEncounter, will be a subset of the mapEncounter table
// Finds a MAP, then finds a subset of the mapEncounter table that matches the map fk
// Finds all tiles from tile fk and appends a column with image URLs
router.get("/api/mapEncounter/:id", (req, res) => {
  db.Map.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: db.mapEncounter,
      include: [db.Tile]
    }]
  })
    .then(mapEncounterData => res.json(mapEncounterData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// POST route for new mapEncounter
router.post("/api/mapEncounter", (req, res) => {
  db.mapEncounter.create(req.body)
    .then(mapEncounterData => res.json(mapEncounterData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// PUT route for updating a mapEncounter
router.put("/api/mapEncounter", (req, res) => {
  db.mapEncounter.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(mapEncounterData => res.json(mapEncounterData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// ALTERNATE PUT route for updating a mapEncounter
router.put("/api/mapEncounter/:id", (req, res) => {
  db.mapEncounter.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(mapEncounterData => res.json(mapEncounterData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
})

// DELETE route for single mapEncounter
router.delete("/api/mapEncounter/:id", (req, res) => {
  db.mapEncounter.destroy({
    where: {
      id: req.params.id
    }
  }).then(mapEncounterData => res.json(mapEncounterData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
});

router.delete("/api/deletemapencounterbymap/:mapid", (req, res) => {
  db.mapEncounter.destroy({
    where: {
      MapId: req.params.mapid
    }
  }).then(mapEncounterData => res.json(mapEncounterData))
    .catch(err => {
      console.log((err.message));
      res.status(500).send(err.message);
    });
});

module.exports = router;