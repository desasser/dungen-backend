const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
// const mergeImg = require("merge-img")
const imageStitcher = require("../utils/image-stitcher/index.js")
const db = require("../models");

const { v4: uuidv4 } = require('uuid');

const axios = require('axios');
const { debugPort } = require("process");
const e = require("express");

require('dotenv').config()

 const URL_PREFIX = process.env.URL_PREFIX
//When ready, the deployed site will use the following:
//const URL_PREFIX = "https://quiet-caverns-20153.herokuapp.com"

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
    environment: req.body.environment,
    row: req.body.row,
    column: req.body.column,
    public: req.body.public
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
        .then(updatedMap => {
            res.json(updatedMap)
            
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

router.get('/api/rendermap/:id', (req,res) => {
  const imageUUID = uuidv4();

  db.Map.findAll({
    where: {
      id: req.params.id
    },
    order: [
      [{model: db.MapTile}, 'yCoord', 'ASC'],
      [{model: db.MapTile}, 'xCoord', 'ASC']
    ],
    include: {
      model: db.MapTile,
      include: [db.Tile]
    }
  })
  .then(mapData => {
    // res.json(mapData);
    if(mapData[0].image_url === "" || mapData[0].image_url === null) {
      console.log(mapData[0].MapTiles);
      const mapTiles = mapData[0].MapTiles;

      if(mapTiles.length > 0) {
        // res.json(mapTiles);
        // this should come from the table size
        const gridDimensions = getGridWidthHeight(mapTiles);
        // res.json(mapTiles);
        // const rowTiles = [...mapTiles].filter(tile => tile.yCoord === 0);

        let imgObjArr = [];
        for(var i = 0; i < gridDimensions.height; i++) {
          const rowTiles = [...mapTiles].filter(tile => tile.yCoord === i);
          // console.log(rowTiles);

          if(rowTiles.length !== 0) {
            const row = buildRow(rowTiles, gridDimensions.width);
            imgObjArr.push(...row);
          }
        }
        // res.json(imgObjArr);
        imageStitcher(imgObjArr).then(img => {
          img.write( `./assets/maps/${imageUUID}.png`, () => {
            console.log(`${URL_PREFIX}/assets/maps/${imageUUID}.png`);
            res.json({image_url: `${URL_PREFIX}/assets/maps/${imageUUID}.png`, mapTitle: mapData[0].name, mapId: mapData[0].id})
          })
        });

      } else {
        res.json({image_url: null, mapTitle: "", mapId: null});

      }
    } else {
      res.json({image_url: mapData[0].image_url, mapTitle: mapData[0].name, mapId: mapData[0].id})
    }
  })
  .catch(err => console.error(err));
});

function getGridWidthHeight(tiles) {
  // get width from established function
  // height is the value of the last y coordinate (offsets are from top left corner of images)
  return { width: getWidth(tiles) + 2, height: tiles[tiles.length - 1].yCoord + 2 }
}

function getWidth(tiles) {
  // sort the tiles by yCoord, high to low to get gridWidth
  let sortedTiles = [...tiles].sort((a,b) => a.xCoord < b.xCoord ? 1 : -1);

  // return sortedTiles[0].xCoord - sortedTiles[sortedTiles.length - 1].xCoord;
  return sortedTiles[0].xCoord;
}

function buildRow(tiles, gridWidth) {
  let image_url = `${URL_PREFIX}/assets/blank_tile_199x199_alt.png`;
  let row = [];
  let offset = 199;

  for(var i = 0; i < gridWidth; i++) {
    let tile = {
      src: image_url,
      offsetY: tiles[0].yCoord * offset,
      offsetX: 0,
      rotation: 0,
      mirrored: 1
    }

    let foundTile = [...tiles].filter(tile => tile.xCoord === i);

    if(foundTile.length > 0) {
      // if we find a tile, we can set the image (duh)
      tile.src = foundTile[0].Tile !== undefined ? foundTile[0].Tile.image_url : image_url;
      tile.rotation = foundTile[0].orientation !== undefined ? foundTile[0].orientation : 0;
      tile.mirrored = foundTile[0].mirror !== undefined ? foundTile[0].mirror : 1;

    }

    if(i === 0 && tiles[0].yCoord > 0) {
      // console.log(tiles[0].yCoord);
      // if we are NOT on the first row (y > 0)
      // AND the found tile *IS* the first one (i === 0),
      // we need to reset the offsetX to the left edge of the grid
      // otherwise, no offset needed (default) -- offset is *from the right edge of the last image*
      tile.offsetX = gridWidth * (offset * -1);
    }
  
    row.push(tile);
  }

  return row;
}

module.exports = router;