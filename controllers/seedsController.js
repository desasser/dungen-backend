const express = require("express");
const router = express.Router();
const Sequelize = require('sequelize');
const axios = require('axios');
const db = require("../models");

const URL_PREFIX = process.env.URL_PREFIX
// const URL_PREFIX = "http://localhost:3030"
//When ready, the deployed site will use the following:
// const URL_PREFIX = "https://quiet-caverns-20153.herokuapp.com"

function randomStringGenerator() {
  let randomChars = 'abcdefghijklmnopqrstuvwxyz';

  let seed = "";
  for (var i = 0; i < Math.floor(Math.random() * (20 - 8 + 1) + 1); i++) {
    seed += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  return seed;
}

const donjon = "https://donjon.bin.sh/5e/random/rpc-5e.fcgi?type=Encounter";
router.get("/api/encounter/donjon/:playernum/:playerlvl/:difficulty/:environment/:loottype/:n", function(req, res) {
  console.log(req.params);

  axios.get(`${donjon}&n_pc=${req.params.playernum}&level=${req.params.playerlvl}&difficulty=${req.params.difficulty}&environment=${req.params.environment}&loot_type=${req.params.loottype}&n=${req.params.n}`)
  .then(data => {
    console.log(data.data);
    res.send(data.data)
  })
  .catch(err => res.send(err))
});

//CREATE new user
router.post("/api/seed/users", function (req, res) {
  db.User.bulkCreate([
    {
      userName: "whiterabbit",
      password: "MadBunnies!",
      name: "Leora Harlyn",
      email: 'joe1@joe.joe',
      public: true
    },
    {
      userName: "madscientist",
      password: "AllTheZoTs!",
      name: "Hella Margrave",
      email: 'joe2@joe.joe',
      public: true
    },
    {
      userName: "monstros",
      password: "BleedMeDry",
      name: "F. Valentine",
      email: 'joe3@joe.joe',
      public: true
    },
    {
      userName: "firebird",
      password: "RiseFromTheAshes",
      name: "Phoenix Maudlin",
      email: 'joe4@joe.joe',
      public: true
    },
    {
      userName: "storm",
      password: "OutOfMyWay",
      name: "Adelaide Stormvahl",
      email: 'joe5@joe.joe',
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
      name: "Arctic",
      thumbnail_url: ""
    },
    {
      name: "Coastal",
      thumbnail_url: ""
    },
    {
      name: "Desert",
      thumbnail_url: ""
    },
    {
      name: "Forest",
      thumbnail_url: ""
    },
    {
      name: "Grassland",
      thumbnail_url: "",
    },
    {
      name: "Hill",
      thumbnail_url: "",
    },
    {
      name: "Jungle",
      thumbnail_url: "",
    },
    {
      name: "Mountain",
      thumbnail_url: "",
    },
    {
      name: "Swamp",
      thumbnail_url: "",
    },
    {
      name: "Underdark",
      thumbnail_url: "",
    },
    {
      name: "Underwater",
      thumbnail_url: "",
    },
    {
      name: "Urban",
      thumbnail_url: "",
    },
    {
      name: "Celestial Plane",
      thumbnail_url: "",
    },
    {
      name: "Abyssal Plane",
      thumbnail_url: "",
    },
    {
      name: "Infernal Plane",
      thumbnail_url: "",
    },
    {
      name: "Elemental Air",
      thumbnail_url: "",
    },
    {
      name: "Elemental Earth",
      thumbnail_url: "",
    },
    {
      name: "Elemental Fire",
      thumbnail_url: "",
    },
    {
      name: "Elemental Water",
      thumbnail_url: "",
    }
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
    res.status(500).json(error)
  });
});

//CREATE new tileSets
router.post("/api/seed/tileSets", function (req, res) {
  db.TileSet.bulkCreate([
    {
      name: "Dungeon",
      thumbnail_url: "https://images.unsplash.com/photo-1585194328937-30ffb4529e8f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
      name: "Dwarven Tomb",
      thumbnail_url: "https://images.unsplash.com/photo-1599792350110-b2bf0b45e0d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1269&q=80"
    },
    {
      name: "Forgotten Temple",
      thumbnail_url: "https://images.unsplash.com/photo-1521898369703-1646a1850bea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      name: "Wizard Workshop",
      thumbnail_url: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
    },
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
    res.status(500).json(error)
  });
});

//CREATE new tiles
router.post("/api/seed/tiles/dungeon", function (req, res) {
  db.Tile.bulkCreate([
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC01.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC02.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC03.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC04.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC05.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC06.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC07.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC08.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC09.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC10.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC11.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC12.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC13.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC14.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC15.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC16.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC17.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC18.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC19.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC20.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC21.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC22.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC23.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC24.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC25.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC26.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC27.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC28.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC29.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC30.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC31.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC32.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC33.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC34.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC35.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC36.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC37.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC38.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC39.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC40.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC41.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC42.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC43.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC44.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC45.png`
    },
    {
      TileSetId: 1,
      image_url: `${URL_PREFIX}/assets/dungeon/LowRes/2EDC46.png`
    }
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
    res.status(500).json(error)
  });
});

router.post("/api/seed/tiles/dwarven-tomb", function (req, res) {
  db.Tile.bulkCreate([
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT01.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT02.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT03.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT04.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT05.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT06.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT07.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT08.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT09.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT10.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT11.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT12.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT13.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT14.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT15.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT16.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT17.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT18.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT19.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT20.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT21.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT22.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT23.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT24.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT25.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT26.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT27.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT28.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT29.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT30.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT31.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT32.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT33.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT34.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT35.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT36.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT37.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT38.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT39.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT40.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT41.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT42.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT43.png`
    },
    {
      TileSetId: 2,
      image_url: `${URL_PREFIX}/assets/dwarven_tomb/LowRes/2EDwT44.png`
    }
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
    res.status(500).json(error)
  });
});

router.post("/api/seed/tiles/forgotten-temple", function (req, res) {
  db.Tile.bulkCreate([
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT01.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT02.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT03.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT04.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT05.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT06.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT07.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT08.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT09.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT10.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT11.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT12.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT13.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT14.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT15.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT16.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT17.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT18.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT19.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT20.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT21.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT22.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT23.png`
    },
    {
      TileSetId: 3,
      image_url: `${URL_PREFIX}/assets/forgotten_temple/LowRes/2EFoT24.png`
    }
  ]).then(seeded => {
    res.json(seeded)
  }).catch(function (error) {
    res.status(500).json(error)
  });
});

router.post("/api/seed/tiles/wizard-workshop", function (req, res) {
  db.Tile.bulkCreate([
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0301.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0302.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0303.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0304.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0305.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0306.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0307.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0308.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0309.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0310.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0311.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0312.png`
    },
    {
      TileSetId: 4,
      image_url: `${URL_PREFIX}/assets/wizard_workshop/LowRes/2EDX0313.png`
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

router.post("/api/random/user", function (req, res) {
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

router.post("/api/random/tileSet/:name", function (req, res) {
  db.TileSet.create({
    name: req.params.name,
    thumbnail_url: `https://picsum.photos/seed/${req.params.name}/200`
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => console.error(err));
})

router.post("/api/random/tile/:TileSetid", function (req, res) {
  let seed = randomStringGenerator();

  db.Tile.create({
    TileSetId: req.params.TileSetid,
    image_url: `https://picsum.photos/seed/${seed}/200`
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => console.error(err));
})

router.get("/api/random/user", function (req, res) {
  db.User.findAll()
    .then(users => {
      let index = Math.floor(Math.random() * users.length);
      let user = users[index];

      res.json(user);

    }).catch(err => console.error(err));
})

router.get("/api/random/environment", function (req, res) {
  db.Environment.findAll()
    .then(environments => {
      let index = Math.floor(Math.random() * environments.length);
      let environment = environments[index];

      res.json(environment);

    }).catch(err => console.error(err));
})

router.get("/api/random/tile", function (req, res) {
  db.Tile.findAll()
    .then(tiles => {
      let index = Math.floor(Math.random() * tiles.length);
      let tile = tiles[index];

      res.json(tile);

    }).catch(err => console.error(err));
})

router.get("/api/random/map", function (req, res) {
  db.Map.findAll()
    .then(maps => {
      let index = Math.floor(Math.random() * maps.length);
      let map = maps[index];

      res.json(map);

    }).catch(err => console.error(err));
})

router.get("/api/random/maptile", function (req, res) {
  db.MapTile.findAll()
    .then(maptiles => {
      let index = Math.floor(Math.random() * maptiles.length);
      let maptile = maptiles[index];

      res.json(maptile);

    }).catch(err => console.error(err));
})

module.exports = router;