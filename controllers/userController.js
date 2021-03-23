const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const db = require("../models");

const axios = require('axios');


require('dotenv').config()

const authenticateUser = (req) => {
  console.log(`authenticating the following token on line 13 ${req}`)
  let token = false;

  if (!req.headers) {
    console.log("line 17")
    token = false
  }
  else if (!req.headers.authorization) {
    console.log("line 22. no auth")
    token = false;
  }
  else {
    console.log("splitting req")
    token = req.headers.authorization.split(" ")[1];
  }
  let data = false;
  if (token) {
    console.log("line 30. Maybe this is working")
    data = jwt.verify(token, process.env.token, (error, data) => {
      if (error) {
        console.log(error)
        return false;
      }
      else {
        console.log("success, I guess...")
        return data
      }
    })
  } else if (req.body.token) {
    console.log("line 42. This is a possibility...")
    data = jwt.verify(req.body.token, process.env.token, (error, data) => {
      if (error) {
        console.log(error)
        return false;
      }
      else {
        console.log("success, I guess...")
        return data
      }
    })
  }
  console.log("returning on line 43...")
  console.log(data)
  return data
}

//Authenticate User
router.get('/auth', (req, res) => {
  console.log(`this is the token auth ${req.headers.authorization}`)
  let tokenData = authenticateUser(req);
  if (tokenData) {
    console.log(tokenData)
    console.log(tokenData.id)
    db.User.findOne({
      where: {
        id: tokenData.id
      },
      include: [db.Map]

    }).then(user => {
      console.log(user)
      res.json(user)
    }).catch(err => {
      res.status(500).json(err);
      console.log("this was a mistake. remove the include statement for now.")
      console.log(err)
    })
  } else {
    res.status(403).send('auth failed')
  }
})


//CREATE new user
router.post("/api/newUser", function (req, res) {
  db.User.create(req.body).then(newUser => {
    const token = jwt.sign({
      userName: newUser.userName,
      id: newUser.id
    }, "supersecretpizzaparty",
      {
        expiresIn: "24h"
      })
    return res.json({ user: newUser, token })
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

//POST for logging in a returning user
router.post("/login", (req, res) => {
  console.log(req.body)
  db.User.findOne({
    where: {
      userName: req.body.userName
    },
    include: [db.Map]
  }).then(user => {
    console.log(user)
    if (!user) {
      return res.status(404).send('no such user')
    }
    else if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({
        userName: user.userName,
        id: user.id
      }, "supersecretpizzaparty",
        {
          expiresIn: "24h"
        })
      return res.json({ user, token })
    }
    else {
      return res.status(403).send('wrong password')
    }
  })
})

// //testing a protected route
// router.get("/shhh" (req,res) => {

// })


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

//UPDATE user connections, follow a user
//Takes in two user IDs in the body
router.put("/api/follow", (req, res) => {
  //on button click
  //find logged in user
  let tokenData = authenticateUser(req);
  if (tokenData) {
    db.User.findOne({
      where: {
        id: req.body.followerId //logged in user
      }
    }).then(dbUser => {
      //add connection between the logged in user and the target to be followed
      dbUser.addFollower(req.body.userId);
      res.json(dbUser)
    }).catch(err => {
      console.log(err.message);
      res.status(500).send(err.message);
    })
  }
  else {
    res.status(403).send('You must be logged in to follow another map maker')
  }
})

//UPDATE user connections, unfollow a user
//Takes in two user IDs in the body
router.delete("/api/unfollow", (req, res) => {
  //on button click
  //find logged in user
  let tokenData = authenticateUser(req);
  if (tokenData) {
    db.User.findOne({
      where: {
        id: req.body.followerId //logged in user
      }
    }).then(dbUser => {
      //remove connection between the logged in user and the target to be followed
      dbUser.removeFollower(req.body.userId);
      res.json(dbUser)
    }).catch(err => {
      console.log(err.message);
      res.status(500).send(err.message);
    })
  }
  else {
    res.status(403).send('You must be logged in to unfollow another map maker')
  }
})

//GET route for all users that the logged in user follows
router.get('/api/follows/:id', (req, res) => {
  db.User.findAll({
    // where: {
    //   id: req.params.id
    // },
    include: [{
      model: db.User,
      as: 'Follower'
    }]
  }).then(dbUser => {
    res.json(dbUser);
  }).catch(err => {
    console.log(err.message);
    res.status(500).send(err.message);
  })
})


//PUT route to add favorited map to FAVORITES
//Takes in two user IDs in the body
router.put("/api/favorite", (req, res) => {
  // let userData = authenticateUser(req);
  // if (userData) {
    db.User.findOne({
      where: {
        id: req.body.userId //logged in user
      }
    }).then(dbUser => {
      dbUser.addFavorite(req.body.favoriteId); //favoriteId is a mapId
      res.json(dbUser)
    }).catch(err => {
      console.log(err.message);
      res.status(500).send(err.message);
    })
  // } else {
  //   res.status(403).send('You must be logged in to favorite a map')
  // }
})

//DELETE route to remove favorited map from FAVORITES
//Takes in two user IDs in the body
router.delete("/api/unfavorite", (req, res) => {
  // let userData = authenticateUser(req);
  // if (userData) {
    db.User.findOne({
      where: {
        id: req.body.userId //logged in user
      }
    }).then(dbUser => {
      dbUser.removeFavorite(req.body.favoriteId); //favoriteId is a mapId
      res.json(dbUser)
    }).catch(err => {
      console.log(err.message);
      res.status(500).send(err.message);
    })
  // } else {
  //   res.status(403).send('You must be logged in to unfavorite a map')
  // }
})


//UPDATE user information
router.put("/api/updateUser", function (req, res) {
  let userData = authenticateUser(req);
  if (userData) {
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
  } else {
    res.status(403).send('You must be logged in to favorite a map')
  }
})

//DELETE user
router.delete("/api/deleteUser/:id", function (req, res) {
  let userData = authenticateUser(req);
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => {
    if (userData.id === user.UserId) {
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
    } else {
      res.status(403).send('You do not want to delete this user')
    }
  })
})

module.exports = router;