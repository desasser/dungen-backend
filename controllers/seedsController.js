const express = require("express");
const router = express.Router();

const db = require("../models");

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
      image_url: "https://picsum.photos/seed/cave1/100"
    },
    {
      EnvironmentId: 1,
      image_url: "https://picsum.photos/seed/cave2/100"
    },
    {
      EnvironmentId: 1,
      image_url: "https://picsum.photos/seed/cave3/100"
    },
    {
      EnvironmentId: 1,
      image_url: "https://picsum.photos/seed/cave4/100"
    },
    {
      EnvironmentId: 1,
      image_url: "https://picsum.photos/seed/cave5/100"
    },
    {
      EnvironmentId: 1,
      image_url: "https://picsum.photos/seed/cave6/100"
    },
    {
      EnvironmentId: 1,
      image_url: "https://picsum.photos/seed/cave7/100"
    },
    {
      EnvironmentId: 1,
      image_url: "https://picsum.photos/seed/cave8/100"
    },
    {
      EnvironmentId: 2,
      image_url: "https://picsum.photos/seed/dungeon1/100"
    },
    {
      EnvironmentId: 2,
      image_url: "https://picsum.photos/seed/dungeon2/100"
    },
    {
      EnvironmentId: 2,
      image_url: "https://picsum.photos/seed/dungeon3/100"
    },
    {
      EnvironmentId: 2,
      image_url: "https://picsum.photos/seed/dungeon4/100"
    },
    {
      EnvironmentId: 2,
      image_url: "https://picsum.photos/seed/dungeon5/100"
    },
    {
      EnvironmentId: 2,
      image_url: "https://picsum.photos/seed/dungeon6/100"
    },
    {
      EnvironmentId: 2,
      image_url: "https://picsum.photos/seed/dungeon7/100"
    },
    {
      EnvironmentId: 2,
      image_url: "https://picsum.photos/seed/dungeon8/100"
    },
    {
      EnvironmentId: 3,
      image_url: "https://picsum.photos/seed/underdark1/100"
    },
    {
      EnvironmentId: 3,
      image_url: "https://picsum.photos/seed/underdark2/100"
    },
    {
      EnvironmentId: 3,
      image_url: "https://picsum.photos/seed/underdark3/100"
    },
    {
      EnvironmentId: 3,
      image_url: "https://picsum.photos/seed/underdark4/100"
    },
    {
      EnvironmentId: 3,
      image_url: "https://picsum.photos/seed/underdark5/100"
    },
    {
      EnvironmentId: 3,
      image_url: "https://picsum.photos/seed/underdark6/100"
    },
    {
      EnvironmentId: 3,
      image_url: "https://picsum.photos/seed/underdark7/100"
    },
    {
      EnvironmentId: 3,
      image_url: "https://picsum.photos/seed/underdark8/100"
    },
    {
      EnvironmentId: 4,
      image_url: "https://picsum.photos/seed/forest1/100"
    },
    {
      EnvironmentId: 4,
      image_url: "https://picsum.photos/seed/forest2/100"
    },
    {
      EnvironmentId: 4,
      image_url: "https://picsum.photos/seed/forest3/100"
    },
    {
      EnvironmentId: 4,
      image_url: "https://picsum.photos/seed/forest4/100"
    },
    {
      EnvironmentId: 4,
      image_url: "https://picsum.photos/seed/forest5/100"
    },
    {
      EnvironmentId: 4,
      image_url: "https://picsum.photos/seed/forest6/100"
    },
    {
      EnvironmentId: 4,
      image_url: "https://picsum.photos/seed/forest7/100"
    },
    {
      EnvironmentId: 4,
      image_url: "https://picsum.photos/seed/forest8/100"
    },
    {
      EnvironmentId: 5,
      image_url: "https://picsum.photos/seed/ship1/100"
    },
    {
      EnvironmentId: 5,
      image_url: "https://picsum.photos/seed/ship2/100"
    },
    {
      EnvironmentId: 5,
      image_url: "https://picsum.photos/seed/ship3/100"
    },
    {
      EnvironmentId: 5,
      image_url: "https://picsum.photos/seed/ship4/100"
    },
    {
      EnvironmentId: 5,
      image_url: "https://picsum.photos/seed/ship5/100"
    },
    {
      EnvironmentId: 5,
      image_url: "https://picsum.photos/seed/ship6/100"
    },
    {
      EnvironmentId: 5,
      image_url: "https://picsum.photos/seed/ship7/100"
    },
    {
      EnvironmentId: 5,
      image_url: "https://picsum.photos/seed/ship8/100"
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

// router.post("/api/seed/maptiles", function (req, res) {
//   db.MapTile.bulkCreate([
//     { // underdark
//       name: "Rambo's Throne of Darkness",
//       image_url: "https://picsum.photos/seed/rambo/200",
//       UserId: 3
//     },
//     { // dungeon
//       name: "Crypt of the Frozen Morass",
//       image_url: "https://picsum.photos/seed/crypt/200",
//       UserId: 5
//     },
//     { // cave
//       name: "la Ceverne Emeraude",
//       image_url: "https://picsum.photos/seed/emerald/200",
//       UserId: 2
//     },
//     { // forest
//       name: "Golden Snail Wood: Special Grove",
//       image_url: "https://picsum.photos/seed/snail/200",
//       UserId: 4
//     },
//     { // ship
//       name: "Boaty McBoatFace",
//       image_url: "https://picsum.photos/seed/boaty/200",
//       UserId: 1
//     }
//   ]).then(seeded => {
//     res.json(seeded)
//   }).catch(function (error) {
//       res.status(500).json(error)
//   });
// });