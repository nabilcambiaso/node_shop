const { config } = require("dotenv");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
require('dotenv').config();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('File type must be either png or jpeg'), false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});


router.get("/", (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc.id,
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            request: {
              type: 'GET',
              url: `${process.env.URL}/products/${doc._id}`
            }
          }
        })
      }
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error
      })
    });
});

router.post("/", upload.single('productImage'), (req, res, next) => {
  console.log(req.file)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post products",
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          productImage: result.productImage,
          request: {
            type: "GET",
            url: `${process.env.URL}/products/${result._id}`,
          }
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "Not found, Invalid Id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    console.log(ops)
    updateOps[ops.propName] = ops.value;
  }
  Product.updateMany({ _id: id }, { $set: updateOps }).exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Product updated successfully",
        result: { ...result },
        request: {
          type: 'GET',
          description: 'get the updated producted',
          url: `${process.env.URL}/products/${id}`,
        }
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id }).exec().then((result) => {
    res.status(200).json(result);
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      error
    });
  })
});

module.exports = router;
