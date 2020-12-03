const express = require('express');
const Router = express.Router();

const shoppingItem = require('../models/items.model');

Router.route('/').get((req, res) => {
  shoppingItem
    .find()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

Router.route('/add').post((req, res) => {
  const { itemName, itemPrice, itemPicture } = req.body;
  console.log(itemName, itemPrice, itemPicture);

  const newItem = new shoppingItem({
    itemName,
    itemPrice,
    itemPicture,
  });

  newItem
    .save()
    .then((response) => {
      res.status(200).send(response);
      console.log(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

Router.route('/delete/:id').delete((req, res) => {
  const id = req.params.id;

  shoppingItem
    .findByIdAndDelete(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = Router;
