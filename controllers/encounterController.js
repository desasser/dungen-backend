const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require('axios');
const donjon = "https://donjon.bin.sh/5e/random/rpc-5e.fcgi?type=Encounter";
// const dndapi = "https://www.dnd5eapi.co/api/"

// //CREATE new Encounter
// router.post("/api/newEncounter", function (req, res) {
//     console.log(req.body)
//     db.Encounter.create({
//         type: req.body.type,
//         name: req.body.name,
//         cr: req.body.cr,
//         dc: req.body.dc,
//         description: req.body.description
//     }).then(function (data) {
//         console.log(data)
//         res.json(data)
//     }).catch(function (error) {
//         res.status(500).json(error)
//     });
// });
//---------------------------------------------------------------------------------
// //Get Equiptment from 5eAPI
// router.get('/api/equiptment/:index', function (req, res) {
//     axios.get(`${dndapi}/equiptment/${req.params.index}`).then(function (item) {
//         res.json(item)
//     }).catch(error => {
//         res.status(500).send(error.message)
//     })
// });

// //Get Magic Items from 5eAPI
// router.get('/api/magic-items/:index', function (req, res) {
//     axios.get(`${dndapi}/magic-items/${req.params.index}`).then(function (item) {
//         res.json(item)
//     }).catch(error => {
//         res.status(500).send(error.message)
//     })
// });

// //Get monsters from 5eAPI
// router.get('/api/spells/:index', function (req, res) {
//     axios.get(`${dndapi}/spells/${req.params.index}`).then(function (item) {
//         res.json(item)
//     }).catch(error => {
//         res.status(500).send(error.message)
//     })
// });

// //Get Monster by Name from 5eAPI
// router.get('/api/monsters/:index', function (req, res) {
//     axios.get(`${dndapi}/monsters/${req.params.index}`).then(function (item) {
//         res.json(item)
//     }).catch(error => {
//         res.status(500).send(error.message)
//     })
// });

// //Get Monster by CR from 5eAPI
// router.get('/api/monsters/:cr', function (req, res) {
//     axios.get(`${dndapi}/monsters?challenge_rating=${req.params.cr}`).then(function (item) {
//         res.json(item)
//     }).catch(error => {
//         res.status(500).send(error.message)
//     })
// });

// //Get Conditions from 5eAPI
// router.get('/api/conditions/:index', function (req, res) {
//     axios.get(`${dndapi}/conditions/${req.params.index}`).then(function (item) {
//         res.json(item)
//     }).catch(error => {
//         res.status(500).send(error.message)
//     })
// });
//--------------------------------------------------------------------------------

//Get random encounter granular style from donjon

router.get("/api/encounter/donjon/:playernum/:playerlvl/:difficulty/:environment/:loottype/:n", function (req, res) {
    console.log(req.params);

    axios.get(`${donjon}&n_pc=${req.params.playernum}&level=${req.params.playerlvl}&difficulty=${req.params.difficulty}&environment=${req.params.environment}&loot_type=${req.params.loottype}&n=${req.params.n}`)
        .then(data => {
            console.log(data.data);
            res.send(data.data)
        })
        .catch(err => res.send(err))
});

//Get random treasure hoard based on CR from donjon
router.get('/api/donjon/treasure/:type/:cr', function (req, res) {

    axios.get(`${donjon}type=Treasure+${req.params.type}&cr=${req.params.cr}&n=1`
    ).then(data => {
        res.send(data.data)
    }).catch(error => {
        res.status(404).send(error.message)
    })
})


module.exports = router;