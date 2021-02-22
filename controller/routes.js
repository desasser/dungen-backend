const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios');
const { debugPort } = require("process");

require('dotenv').config()

// =========================================================================
// Landing Page Route
// =========================================================================
router.get("/", function (req, res) {
    res.send("Hey there, friend")
})

// =========================================================================
// User Account/API Routes
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
router.get("/api/getuser/:userName", function (req, res) {
    console.log(req.params)
    db.User.findOne({
        where: {
            userName: req.params.userName
        },
        include: [
            {model: db.Map}
        ],
        order: [
            [db.Map,"createdAt", "DESC"]
        ]
    }).then(function (singleUser) {
        res.send(singleUser)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})

// **NOT SURE IF THIS put route IS WORKING?**
//UPDATE user information
router.put("api/updateUser/:userName", function (req, res) {
    console.log(req.body)
    db.User.update(req.body,
        {
            where: {
                id: req.params.userName
            }
        })
        .then(updatedUser => {
            res.json(updatedUser)
        }).catch(error => {
            res.status(500).send(error.message)
        })

})

// =========================================================================
// User Page Routes
// =========================================================================

router.get("/page/:userName", function (req, res) {
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


// =========================================================================
// Map API Routes
// =========================================================================

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

//FIND one map
router.get("/api/map/:name", function (req, res) {
    console.log(req.params)
    db.Map.findOne({
        where: {
            name: req.params.name
        }
    }).then((oneMap) => {
        res.send(oneMap)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})

module.exports = router;