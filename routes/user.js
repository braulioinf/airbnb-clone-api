const express = require('express');
const router = express.Router();
const Validator = require('validatorjs');
const firebase = require('firebase');
const {UserModel} = require('../models/user');

// GET /
router.get('/', (req, res, next) => {
  return res.json({
    data: [],
  });
});

// GET /:id
router.get('/:id', (req, res, next) => {
  const user = {};
  return res.status(200).json({
    user,
  });
});

// POST /
router.post('/', (req, res, next) => {
  const { body } = req;
  const userRules = {
    name: 'required|string',
    lastName: 'required|string',
    email: 'required|string|email',
    userType: 'required|string',
    password: 'required|string|confirmed',
    password_confirmation: 'required|string',
  };
  const validation = new Validator(body, userRules);
  if (validation.fails()) {
    const { errors } = validation.errors;
    return res.status(400).json({
      code: 400,
      errors,
    });
  }
  const { name, lastName, email, userType, password } = body;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(account => {
    const user = new UserModel({
      name,
      lastName,
      email,
      userType,
      providerId: account.user.uid,
    });
    user.save();
    return res.status(201).json({
      user,
    });
  }).catch(err => {
    return res.status(400).json({
      code: 400,
      message: err.message,
    });
  });
});

// PUT /:id
router.put('/:id', (res, res, next) => {
  const user = {};
  return res.status(200).json({
    user,
  });
});

// DELETE /:id
router.delete('/:id', (res, res, next) => {
  return res.status(204).json();
});

module.exports = router;