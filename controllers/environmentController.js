const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios');

require('dotenv').config()


//CREATE new Environment
router.post("/api/newEnvironment", function (req, res) {
    console.log(req.body)
    db.Environment.create({
        name: req.body.name,
        thumbnail_url: req.body.thumbnail_url
    }).then(function (data) {
        console.log(data)
        res.json(data)
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//GET all Environments
router.get("/api/Environments", function (req, res) {
    db.Environment.findAll({}).then((Environments) => {
        res.json(Environments)
    }).catch(error => {
        console.log(error.message);
        res.status(500).send(error.message)
    })
})

//GET one Environment
router.get("/api/getEnvironment/:name", function (req, res) {

    db.Environment.findOne({
        where: {
            name: req.params.name
        }
    }).then(function (singleEnvironment) {
        res.send(singleEnvironment)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})

//UPDATE Environment
router.put("/api/updateEnvironment", function (req, res) {

    db.Environment.update(req.body,
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

// DELETE Environment

router.delete("/api/deleteEnvironment/:id", function (req, res) {
    // JT validation needed
    db.Environment.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (deleteEnvironment) {
        res.json(deleteEnvironment)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})

module.exports = router;