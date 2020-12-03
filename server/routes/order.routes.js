const express = require('express');
const Router = express.Router();

const basketOrder = require('../models/order.model');

Router.route('/').get((req, res) => {
  basketOrder
    .find()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

Router.route('/').post((req, res) => {
  console.log(req.body);
  if (
    !req.body.email ||
    !req.body.address ||
    !req.body.cardNumber ||
    !req.body.total ||
    !req.body.orderItems
  ) {
    return res.send({ message: 'Data is required.' });
  }
  const { email, address, cardNumber, total, orderItems } = req.body;

  const newOrder = new basketOrder({
    email,
    address,
    cardNumber,
    total,
    orderItems,
  });

  newOrder
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = Router;
