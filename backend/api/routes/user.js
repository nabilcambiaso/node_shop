const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length !== 0) {
        res.status(409).json({
          message: "User already exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "user created",
                  createdProduct: {
                    _id: result._id,
                    email: result.email,
                  },
                });
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({
                  error,
                });
              });
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length === 0) {
        return res.status(401).json({
          message: "Auth failed",
        });
      } else {
        bcrypt.compare(
          req.body.password,
          user[0].password,
          function (err, result) {
            if (err) {
              return res.status(401).json({
                message: "Auth infos incorrect",
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1h",
                }
              );

              return res.status(401).json({
                message: "Auth successful",
                token
              });
            }
            return res.status(401).json({
              message: "Auth failed",
            });
          }
        );
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
        ...result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});
module.exports = router;
