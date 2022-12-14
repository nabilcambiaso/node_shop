const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');
require('dotenv').config();

exports.get_all_orders = (req, res, next) => {
  Order.find()
    .select('_id product quantity')
    .populate('product')
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
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
};

exports.create_order = (req, res, next) => {
  Product.findById(req.body.product)
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
          product: req.body.product,
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
};

exports.get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product")
    .select('_id productId quantity')
    .exec()
    .then((results) => {
      console.log(results)
      res.status(200).json({
        message: "Order details",
        order: {
          _id: results._id,
          quantity: results.quantity,
          product: results.product
        }
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
}

exports.delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Order deleted",
        orderId: req.params.productId,
      })
    })
    .catch((err) => {
      res.status(500).json(err)
    })
};