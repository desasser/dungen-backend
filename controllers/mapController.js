const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
// const mergeImg = require("merge-img")
const imageStitcher = require("../utils/image-stitcher/index.js")
const db = require("../models");
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');

const axios = require('axios');
const { debugPort } = require("process");
const e = require("express");

require('dotenv').config()

const URL_PREFIX = process.env.URL_PREFIX

const authenticateUser = (req) => {
  console.log(`authenticating the following token on line 13 ${req}`)
  let token = false;

  if (!req.headers) {
    console.log("line 17")
    token = false
  }
  else if (!req.headers.authorization) {
    console.log("line 22. no auth")
    token = false;
  }
  else {
    console.log("splitting req")
    token = req.headers.authorization.split(" ")[1];
  }
  let data = false;
  if (token) {
    console.log("line 30. Maybe this is working")
    console.log(token);
    data = jwt.verify(token, "supersecretpizzaparty", (error, data) => {
      if (error) {
        console.log(error)
        return false;
      }
      else {
        console.log("success, I guess...")
        return data
      }
    })
  }
  console.log("returning on line 43...")
  console.log(data)
  return data
}

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
      UserId: req.params.userId
    },
    include: [db.MapTile]
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
    image_url: req.body.image_url,
    EnvironmentId: req.body.EnvironmentId,
    rows: req.body.rows,
    columns: req.body.columns,
    public: req.body.public
  }).then(function (data) {

    // req.map = {
    //   name: req.body.name,
    //   image_url: req.body.image_url
    // }

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
    .then(updatedMap => {
      res.json(updatedMap)

    }).catch(error => {
      res.status(500).send(error.message)
    })
})

//DELETE a map
router.delete("/api/deleteMap/:id", function (req, res) {
  let userData = authenticateUser(req);
  db.Map.findOne({
    where: {
      id: req.params.id
    }
  }).then(mapData => {
    if (userData.id === mapData.UserId) {
      db.Map.destroy({
        where: {
          id: req.params.id
        }
      }).then((deletedMap) => {
        res.json(deletedMap)
      }).catch(error => {
        res.status(500).send(error.message)
      })
    } else {
      res.status(403).send('You are not the owner of this map')
    }
  })
})

router.get('/api/rendermap/:id', (req, res) => {
  db.Map.findOne({
    where: { id: req.params.id }
  })
  .then(mapData => {
    res.json(mapData);
  })
  .catch(err => console.error(err));
});

module.exports = router;