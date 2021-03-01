const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios');
const { debugPort } = require("process");

require('dotenv').config()

//FINDALL maps
router.get("/api/getmaps", function (req, res) {
  console.log(req.body)
  db.Map.findAll({}).then((maps) => {
      res.json(maps)
  }).catch(error => {
      console.log(error.message);
      res.status(500).send(error.message)
  })
})

//FINDALL maps for ONE user
router.get("/api/usermaps/:userId", function (req, res) {
    console.log(req.params)
    db.Map.findAll({
        where: {
            userId: req.params.userId
        },
        include: [db.MapTiles]
    }).then((userMaps) => {
        res.json(userMaps)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})
//FIND one map
router.get("/api/map/:id", function (req, res) {
  console.log(req.params)
  db.Map.findOne({
      where: {
          id: req.params.id
      },
      include: [
          {
            model: db.MapTile,
            include: [db.Tile]
          }
      ]
  }).then((oneMap) => {
      res.send(oneMap)
  }).catch(error => {
      res.status(500).send(error.message)
  })
})

//CREATING a new map
router.post("/api/newMap", function (req, res) {
  console.log(req.body)
  db.Map.create({
      UserId: req.body.UserId,
      name: req.body.name,
      image_url: req.body.image_url
  }).then(function (data) {

      req.map = {
          name: req.body.name,
          image_url: req.body.image_url
      }
      res.send(data)
  }).catch(error => {
      res.status(500).send(error.message)
  })
})

//UPDATING a Map
router.put("/api/updateMap", function (req, res) {

    db.Map.update(req.body,
        {
            where: {
                id: req.body.id
            }
        })
        .then(updatedEnvironment => {
            res.json(updatedEnvironment)
        }).catch(error => {
            res.status(500).send(error.message)
        })

})

//DELETE a map
router.delete("/api/deleteMap/:id", function (req, res) {

    db.Map.destroy({
        where: {
            id: req.params.id
        }
    }).then((deletedMap) => {
        res.json(deletedMap)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})
module.exports = router;