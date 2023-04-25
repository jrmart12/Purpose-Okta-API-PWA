require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const sendChallenge = async (stateToken, factorId, res) => {};

router.post('/', cors(), async (req, res) => {
  console.log('inside SEND CHALLENGE METHOD');
  console.log(req.body);
  //sendChallenge(stateToken, factorId, res);
});

module.exports = router;
