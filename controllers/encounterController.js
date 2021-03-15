const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require('axios');
const dndapi = "https://www.dnd5eapi.co/api/"

//CREATE new Encounter
router.post("/api/newEncounter", function (req, res) {
    console.log(req.body)
    db.Encounter.create({
        type: req.body.type,
        name: req.body.name,
        cr: req.body.cr,
        dc: req.body.dc,
        description: req.body.description
    }).then(function (data) {
        console.log(data)
        res.json(data)
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//Get Equiptment from 5eAPI
router.get('/api/equiptment/:index', function (req,res){
    axios.get(`${dndapi}/equiptment/${req.params.index}`).then(function (item) {
        res.json(item)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})