const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios');
const { debugPort } = require("process");

require('dotenv').config()

const authenticateUser = (req) => {
    let token = false;

    if (!req.headers) {
        token = false
    }
    else if (!req.headers.authorization) {
        token = false;
    }
    else {
        token = req.headers.authorization.split(" ")[1];
    }
    let data = false;
    if (token) {
        data = jwt.verify(token, "supersecretpizzaparty", (error, data) => {
            if (error) {
                return false;
            }
            else {
                return data
            }
        })
    }
    return data
}

//CREATE new user
router.post("/api/newUser", function (req, res) {
    console.log(req.body)
    db.User.create(
        {
            userName: req.body.userName,
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        })
        .then(function (data) {
            req.user = {
                id: data.id,
                userName: data.userName,
                name: data.name,
                email: data.email,
                password: data.password
            }
            res.send(data)
        }).catch(function (error) {
            res.status(500).json(error)
            console.log(error)
            console.log("sorry, buddy")
        })
});

//POST for logging in a returning user
router.post("/login", (req, res) => {
    
    db.User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(user => {
        if (!user) {
            return res.status(403).send("sorry. Line 72")
        }
        else if (bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({
                userName: user.userName,
                id: user.id
            },"supersecretpizzaparty",
            {
                expiiresIn: "24h"
                //8760 hours in a year
            })
            return res.json({user, token})
        }
        else {
            return res.status(403).send("sorry. Line 86")
        }
    })
})

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
            { model: db.Map }
        ],
        order: [
            [db.Map, "createdAt", "DESC"]
        ]
    }).then(function (singleUser) {
        res.send(singleUser)
    }).catch(error => {
        res.status(500).send(error.message)
    })
})

//UPDATE user information
router.put("/api/updateUser", function (req, res) {
    console.log(req.body)
    db.User.update(req.body,
        {
            where: {
                id: req.body.id
            }
        })
        .then(updatedUser => {
            res.json(updatedUser)
        }).catch(error => {
            res.status(500).send(error.message)
        })

})

router.delete("/api/deleteUser/:id", function (req, res) {

    db.User.destroy(
        {
            where: {
                id: req.params.id
            }
        })
        .then(deleteUser => {

            res.json(deleteUser)
        }).catch(error => {
            res.status(500).send(error.message)
        })

})
module.exports = router;