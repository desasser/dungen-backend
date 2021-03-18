const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios');
const { debugPort } = require("process");

require('dotenv').config()

//CREATE new TileSet
router.post("/api/newTileSet", function (req, res) {
    console.log(req.body)
    db.TileSet.create({
        name: req.body.name,
        thumbnail_url: req.body.thumbnail_url
    }).then(function (data) {
        console.log(data)
        res.json(data)
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//GET all TileSets
router.get("/api/TileSets", function (req, res) {
    db.TileSet.findAll({}).then((TileSets) => {
        res.json(TileSets)
    }).catch(error => {
        console.log(error.message);
        res.status(500).send(error.message)
    })
})

//GET one TileSet
router.get("/api/getTileSet/:name", function (req, res) {

    db.TileSet.findOne({
        where: {
            name: req.params.name
        }
    }).then(function (singleTileSet) {
        res.send(singleTileSet)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})

//UPDATE TileSet
router.put("/api/updateTileSet", function (req, res) {

    db.TileSet.update(req.body,
        {
            where: {
                id: req.body.id
            }
        })
        .then(updatedTileSet => {
            res.json(updatedTileSet)
        }).catch(error => {
            res.status(500).send(error.message)
        })

})

// DELETE TileSet

router.delete("/api/deleteTileSet/:id", function (req, res) {
    // JT validation needed
    db.TileSet.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (deleteTileSet) {
        res.json(deleteTileSet)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})


module.exports = router;