const express = require('express');
const router = express.Router();
//const isAutheticated = require('../middlewares/isAuthenticated');

// GET: /house
router.get('/',  (req, res, next) => {
  return res.json({
    data: [],
  });
});

// GET: /house/:id
router.get('/:id', (req, res, next) => {
  const house = {};
  return res.json({
    data: house
  });
});

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
