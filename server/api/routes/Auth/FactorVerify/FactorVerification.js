require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
const { setInterval } = require('timers/promises');

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const verified = false;

const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const verifyMFAOption = async (body, factorId, res) => {
  await axios
    .post(`${URL}/api/v1/authn/factors/${factorId}/verify`, body, config)
    .then(result => {
      console.log(
        `---------VERIFICATION OF FACTOR ${factorId} : Step 2----------`
      );
      console.log(result.data);
      console.log('---------------------------------------------------------');

      const data = result.data;

      res.send(data);
    })
    .catch(err => {
      console.log('Verification Error ', err.message);
    });
};

router.post('/', cors(), async (req, res) => {
  let body;
  if (req.body.factorType === 'push') {
    body = JSON.stringify({
      stateToken: req.body.stateToken,
    });
  } else {
    body = JSON.stringify({
      stateToken: req.body.stateToken,
      passCode: req.body.passCode,
    });
  }

  //setInterval(verifyMFAOption, 5000, body, req.body.factorId, res);
  verifyMFAOption(body, req.body.factorId, res);
});

module.exports = router;
