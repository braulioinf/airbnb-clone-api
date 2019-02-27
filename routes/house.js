const express = require('express');
const router = express.Router();
const isAutheticated = require('../middlewares/isAuthenticated');
const Validator = require('validatorjs');
const { HouseModel } = require('../models/house');

// GET: /house
router.get('/',  (req, res, next) => {
  HouseModel.find({}, (error, house) => {
    if (error) {
      return res.status(500).json({
        code: 500,
        message: error
      })
    }

    return res.status(200).json({
      code: 200,
      house
    })
  })
});

// GET: /house/:id
router.get('/:id', (req, res, next) => {
  const { params } = req

  HouseModel.findById({ '_id': params.id }, (error, house) => {
    if (error) {
      return res.status(500).json({
        code: 500,
        message: error
      })
    }

    return res.status(200).json({
      code: 200,
      house
    })
  })
});

router.post('/', (req, res, next) => {
  const { body } = req

  const houseRules = {
    'userId': 'required|string',
    'description': 'required|string',
    'address.street': 'required|string',
    'address.city': 'required|string',
    'address.state': 'required|string',
    'address.country': 'required|string',
    'meta.guests': 'required|min:1',
    'meta.bedrooms': 'required|min:1',
    'meta.beds': 'required|min:1',
    'meta.baths': 'required|min:1',
    'meta.likes': 'required|min:1'
  }

  const validation = new Validator(body, houseRules);
  if (validation.fails()) {
    const { errros } = validation.errors;
    return res.status(400).json({
      code: 400,
      errors
    })
  }

  const { userId, description, address, meta, services } = body;
})


// PUT: /house/:id
router.put('/:id', (req, res, next) => {
  const house = {}
  return res.status(200).json(house)
});

// DELETE: /house/:id
router.delete('/:id', (req, res, next) => {
  return res.status(200).json()
})


module.exports = router;
