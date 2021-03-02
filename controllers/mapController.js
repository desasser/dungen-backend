const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const mergeImg = require("merge-img")
const db = require("../models");

const axios = require('axios');
const { debugPort } = require("process");
const e = require("express");

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

router.post('/api/savemap', (req,res) => {
  db.Tile.findAll().then(data => {
    const imgObjArr = [{
      src: data[0].image_url,
      offsetX: 0,
      offsetY: 0
    },
    {
      src: data[1].image_url,
      offsetX: 0,
      offsetY: 0
    },
    {
      src: data[2].image_url,
      offsetX: -398,
      offsetY: 199
    },
    {
      src: data[3].image_url,
      offsetX: 0,
      offsetY: 199
    }
  ]
    
    mergeImg(imgObjArr).then(img => {
      img.write('./assets/maps/outputgrid.png', ()=> console.log('done'))
    })

    // TODO: take in values from local storage
    // TODO: confirm this syntax positions things properly
    // let newRow = 0;
    // // this should come from the table size
    // const gridWidth = data.width;
    // const imgObjArr = data.map(e => {
    //   imgObjArr.src = e.image_url
    //   if (newRow !== e.positionY) {
    //     // if the newRow variable does not equal the y-position of the current element
    //     // then the current element is on the next row
    //     // set the first element in the row back to the start
    //     // multiply -199 by the number of elements in the row
    //     imgObjArr.offsetX = gridWidth * -199;
    //   } else {
    //     // if the newRow variable equals the y-position of the current element
    //     // then the current element is on the same row as the last element
    //     imgObjArr.offsetX = e.positionX*0;
    //   }
    //   imgObjArr.offsetY = e.positionY*199;
    //   newRow = e.positionY
    // });
    // console.log(imageUrlArr);
    // mergeImg(imgObjArr).then(img => {
    //   img.write('./assets/maps/outputAll.png', ()=> console.log('done'))
    // })
    user_number
    res.json(data)
  })
})

module.exports = router;