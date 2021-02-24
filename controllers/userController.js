const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios');
const { debugPort } = require("process");

require('dotenv').config()

//CREATE new user
router.post("/api/newUser", function (req, res) {
  console.log(req.body)
  db.User.create(
      //{
    //   userName: req.body.userName,
    //   name: req.body.name,
    //   password: req.body.password
  //} 
  req.body).then(function (data) {

      req.user = {
          id: data.id,
          name: data.name,
          userName: data.userName,
          password: data.password
      }
      res.send(data)
  }).catch(function (error) {
      res.status(500).json(error)
      console.log(error)
      console.log("sorry, buddy")
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