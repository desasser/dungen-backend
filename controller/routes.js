const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios')

require('dotenv').config()

// =========================================================================
// Page Routes
// =========================================================================
router.get("/", function (req, res) {
    res.send("Hey there, friend")
})

// =========================================================================
// User Account Routes
// =========================================================================

//CREATE new user
router.post("/api/newUser", function (req, res) {
    console.log(req.body)
    db.User.create({
        userName: req.body.userName,
        name: req.body.name,
        password: req.body.password
    }).then(function (data) {

        req.user = {
            id: data.id,
            name: data.name,
            userName: data.userName,
            password: data.password
        }
        res.send(data)
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//GET all users
router.get("/api/users", function (req, res) {
    db.User.findAll({}).then((users) => {
        res.json(users)
    }).catch(error => {
        console.log(error.message);
        res.status(500).send(error.message)
    })
})

//GET one user
router.get("/api/:userName", function (req, res) {
    console.log(req.params)
    db.User.findOne({
        where: {
            userName: req.params.userName
        }
    }).then(function (singleUser) {
        res.send(singleUser)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})

// =========================================================================
// User Page Routes
// =========================================================================

router.get("/:userName", function (req, res) {
    console.log(req.params)
    db.User.findOne({
        where: {
            userName: req.params.userName
        }
    }).then(function (singleUser) {
        res.send("oh hi " + singleUser.name + "!")
    }).catch(error => {
        res.status(500).send(error.message)
    })
})


module.exports = router;