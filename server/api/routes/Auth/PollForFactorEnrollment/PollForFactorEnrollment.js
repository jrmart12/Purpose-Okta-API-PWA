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

const checkPoll = async (body, factorId, res) => {
  console.log('----------------------------BODY---------------------');
  console.log(body);
  console.log('----------------------------FACTOR ID---------------------');
  console.log(factorId);
};

router.post('/', cors(), async (req, res) => {
  console.log(`Receiving body for factor ${req}`);
  checkPoll(req.body, req.body.factorId, res);
});

module.exports = router;
