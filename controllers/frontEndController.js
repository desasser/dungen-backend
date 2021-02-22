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

module.exports = router;