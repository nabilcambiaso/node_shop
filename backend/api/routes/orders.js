const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
require('dotenv').config();

router.get("/", (req, res, next) => {
  Order.find()
    .select('_id productId quantity')
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json({
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.productId,
            price: doc.quantity,
            request: {
              type: 'GET',
              url: `${process.env.URL}/orders/${doc._id}`
            }
          }
        })
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    })
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (product == null) {
        res.status(404).json({
          message: "Product not found",
        })
        return;
      }
      else {
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          productId: req.body.productId,
          quantity: req.body.quantity,
        });
        return order.save();
      }
    })
    .then((result) => {
      console.log(result)
      res.status(201).json(result)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
  .select('_id productId quantity')
  .exec()
  .then((results)=>{
    console.log(results)
    res.status(200).json({
      message: "Order details",
      order:{
        _id:results._id,
        quantity: results.quantity,
        productId:results.productId
      }
    })
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).json(err)
  })
});

router.delete("/:orderId", (req, res, next) => {
  Order.remove({_id: req.params.orderId})
  .exec()
  .then(()=>{
    res.status(200).json({
      message: "Order deleted",
      orderId: req.params.productId,
    })
  })
  .catch((err)=>{
    res.status(500).json(err)
  })
});

module.exports = router;