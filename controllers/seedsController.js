const express = require("express");
const router = express.Router();
const Sequelize = require('sequelize');

const axios = require('axios');

const db = require("../models");

function randomStringGenerator() {
  let randomChars = 'abcdefghijklmnopqrstuvwxyz';

  let seed = "";
  for(var i = 0; i < Math.floor(Math.random() * (20 - 8 + 1) + 1); i++) {
    seed += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  return seed;
}

//CREATE new user
router.post("/api/seed/users", function (req, res) {
  db.User.bulkCreate([
    {
      userName: "whiterabbit",
      password: "MadBunnies!",
      name: "Leora Harlyn",
      public: true
    },
    {
      userName: "madscientist",
      password: "AllTheZoTs!",
      name: "Hella Margrave",
      public: true
    },
    {
      userName: "monstros",
      password: "BleedMeDry",
      name: "F. Valentine",
      public: true
    },
    {
      userName: "firebird",
      password: "RiseFromTheAshes",
      name: "Phoenix Maudlin",
      public: true
    },
    {
      userName: "storm",
      password: "OutOfMyWay",
      name: "Adelaide Stormvahl",
      public: true
    }
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
      res.status(500).json(error)
  });
});

//CREATE new environments
router.post("/api/seed/environments", function (req, res) {
  db.Environment.bulkCreate([
    {
      name: "cave",
      thumbnail_url: "https://images.unsplash.com/photo-1585194328937-30ffb4529e8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
      name: "dungeon",
      thumbnail_url: "https://images.unsplash.com/photo-1599792350110-b2bf0b45e0d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1269&q=80"
    },
    {
      name: "underdark",
      thumbnail_url: "https://images.unsplash.com/photo-1521898369703-1646a1850bea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      name: "forest",
      thumbnail_url: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
    },
    {
      name: "ship",
      thumbnail_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1371&q=80"
    }
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
      res.status(500).json(error)
  });
});

//CREATE new tiles
router.post("/api/seed/tiles", function (req, res) {
  db.Tile.bulkCreate([
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC01.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC02.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC03.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC04.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC05.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC06.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC07.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC08.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC09.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC10.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC11.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC12.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC13.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC14.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC15.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC16.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC17.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC18.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC19.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC20.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC21.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC22.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC23.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC24.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC25.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC26.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC27.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC28.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC29.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC30.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC31.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC32.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC33.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC34.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC35.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC36.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC37.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC38.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC39.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC40.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC41.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC42.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC43.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC44.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC45.jpg"
    },
    {
      EnvironmentId: 1,
      image_url: "../assets/dungeon/LowRes/2EDC46.jpg"
    }
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
      res.status(500).json(error)
  });
});

//CREATE new maps
router.post("/api/seed/maps", function (req, res) {
  db.Map.bulkCreate([
    { // underdark
      name: "Rambo's Throne of Darkness",
      image_url: "https://picsum.photos/seed/rambo/200",
      UserId: 3
    },
    { // dungeon
      name: "Crypt of the Frozen Morass",
      image_url: "https://picsum.photos/seed/crypt/200",
      UserId: 5
    },
    { // cave
      name: "la Ceverne Emeraude",
      image_url: "https://picsum.photos/seed/emerald/200",
      UserId: 2
    },
    { // forest
      name: "Golden Snail Wood: Special Grove",
      image_url: "https://picsum.photos/seed/snail/200",
      UserId: 4
    },
    { // ship
      name: "Boaty McBoatFace",
      image_url: "https://picsum.photos/seed/boaty/200",
      UserId: 1
    }
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
      res.status(500).json(error)
  });
});

//CREATE new maptiles
router.post("/api/seed/maptiles", function (req, res) {
  db.MapTile.bulkCreate([
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 0,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 1,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 2,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 0,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 0,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 0,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 1,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 2,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 3,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 2,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 2,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 1,
      TileId: Math.floor(Math.random() * (8 - 1) + 1),
      xCoord: 3,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 0,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 1,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 2,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 0,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 0,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 0,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 1,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 2,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 3,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 2,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 2,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 2,
      TileId: Math.floor(Math.random() * (16 - 9) + 9),
      xCoord: 3,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 0,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 1,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 2,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 0,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 0,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 0,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 1,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 2,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 3,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 2,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 2,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 3,
      TileId: Math.floor(Math.random() * (24 - 17) + 17),
      xCoord: 3,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 0,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 1,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 2,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 0,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 0,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 0,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 1,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 2,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 3,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 2,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 2,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 4,
      TileId: Math.floor(Math.random() * (32 - 25) + 25),
      xCoord: 3,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 0,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 1,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 2,
      yCoord: 0,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 0,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 0,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 0,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 1,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 2,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 3,
      yCoord: 1,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 2,
      yCoord: 2,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 2,
      yCoord: 3,
      orientation: 1
    },
    {
      MapId: 5,
      TileId: Math.floor(Math.random() * (40 - 33) + 33),
      xCoord: 3,
      yCoord: 3,
      orientation: 1
    }
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
      res.status(500).json(error)
  });
});

router.post("/api/random/user", function(req, res) {
  axios.get('https://randomuser.me/api/?nat=au,ca,de,dk,es,fr,gb,nz,us&password=special,upper,lower,number,10-24')
  .then(apiData => {
    // console.log(apiData.data.results);
    // res.json(apiData.data.results);
    let randomUser = apiData.data.results[0];
    // console.log(randomUser.login.password);

    db.User.create({
      userName: randomUser.login.username,
      password: randomUser.login.password,
      name: `${randomUser.name.first} ${randomUser.name.last}`,
      public: true
    }).then(newUser => {
      res.json(newUser);
    })
  })
  .catch(err => console.error(err));
})

router.post("/api/random/environment/:name", function(req, res) {
  db.Environment.create({
    name: req.params.name,
    thumbnail_url: `https://picsum.photos/seed/${req.params.name}/200`
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => console.error(err));
})

router.post("/api/random/tile/:environmentid", function(req, res) {
  let seed = randomStringGenerator();

  db.Tile.create({
    EnvironmentId: req.params.environmentid,
    image_url: `https://picsum.photos/seed/${seed}/200`
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => console.error(err));
})

router.get("/api/random/user", function(req, res) {
  db.User.findAll()
  .then(users => {
    let index = Math.floor(Math.random() * users.length);
    let user = users[index];
    
    res.json(user);

  }).catch(err => console.error(err)); 
})

router.get("/api/random/environment", function(req, res) {
  db.Environment.findAll()
  .then(environments => {
    let index = Math.floor(Math.random() * environments.length);
    let environment = environments[index];
    
    res.json(environment);

  }).catch(err => console.error(err)); 
})

router.get("/api/random/tile", function(req, res) {
  db.Tile.findAll()
  .then(tiles => {
    let index = Math.floor(Math.random() * tiles.length);
    let tile = tiles[index];
    
    res.json(tile);

  }).catch(err => console.error(err)); 
})

router.get("/api/random/map", function(req, res) {
  db.Map.findAll()
  .then(maps => {
    let index = Math.floor(Math.random() * maps.length);
    let map = maps[index];
    
    res.json(map);

  }).catch(err => console.error(err)); 
})

router.get("/api/random/maptile", function(req, res) {
  db.MapTile.findAll()
  .then(maptiles => {
    let index = Math.floor(Math.random() * maptiles.length);
    let maptile = maptiles[index];
    
    res.json(maptile);

  }).catch(err => console.error(err)); 
})

module.exports = router;