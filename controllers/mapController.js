const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const db = require("../models");

const axios = require('axios');
const { debugPort } = require("process");

require('dotenv').config()

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

module.exports = router;