require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

//const activateFactor = require('./../FactorActivation/FactorActivation');

const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const enrollFactor = async (body, res) => {
  console.log(`received body from client in FACTOR ENROLLMENT is`, body);
  await axios
    .post(`${URL}/api/v1/authn/factors`, body, config)
    .then(result => {
      const data = result.data;
      const factor = data._embedded.factor;
      const factorID = factor.id;
      const factorType = factor.factorType;
      const provider = factor.provider;

      console.log(
        `----------ENROLLMENT OF FACTOR ${factorType} : Step 1--------`
      );
      console.log(data);
      console.log(
        '------------------------------------------------------------------------'
      );

      console.log(`state token : ${data.stateToken}`);
      console.log(`factor id : ${factorID}`);
      console.log(`provider : ${provider}`);
      console.log(`factor type : ${factorType}`);

      let qr_code;

      if (
        ((factorType === 'push' || factorType === 'token:software:totp') &&
          provider === 'OKTA') ||
        (factorType === 'token:software:totp' && provider === 'GOOGLE')
      ) {
        //or OKTA Verify, OKTA Push, Google Authenticator
        qr_code = data._embedded.factor._embedded.activation._links.qrcode.href;
        console.log(`QR CODE LINK : ${qr_code}`);
      }

      res.status(200).json({
        message: 'FACTOR ENROLLMENT STAGE RESPONSE FOR OKTA PUSH ONLY',
        stateToken: data.stateToken,
        userId: data._embedded.user.id, //not required
        status: data.status,
        email: data._embedded.user.profile.login, //not required
        factorType: factorType,
        factorId: factorID,
        qr_code_link: qr_code,
        provider: provider,
      });

      console.log(
        '------------------------------------------------------------------------'
      );

      //activateFactor(data.stateToken, provider, factorType, factorID, res);
    })
    .catch(err => {
      console.log('Error from Factor Enrollment Stage', err.message);
    });
};

router.post('/', cors(), async (req, res) => {
  enrollFactor(req.body, res);
});

module.exports = router;
