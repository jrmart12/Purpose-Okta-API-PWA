require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();
const fs = require("fs");

const cors = require("cors");
//i think we can remove these imports

const API_KEY = process.env.API_KEY;
const URL = process.env.URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `SSWS ${API_KEY}`,
  },
};

router.post("/", cors(), async (req, res) => {
  await axios
    .post(`${URL}/api/v1/users?activate=true`, req.body, config)
    .then((result) => {
      console.log(
        "----------------------------------USER REGISTRATION LOG-------------------------------------",
        result.data
      );
      console.log(
        "--------------------------------------------------------------------------------------------"
      );
      fs.writeFileSync(
        "newUserRegistrationResponseFromOkta.json",
        JSON.stringify(result.data)
      );
      res.send({ data: result.data });
    })
    .catch((err) => {
      console.log(
        "-------------Error from USER REGISTRATION-----------",
        err.message
      );
      console.log(
        "------------------------------------------------------------"
      );
      res.send({ err });
    });
});

module.exports = router;
