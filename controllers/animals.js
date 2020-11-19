const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjZhMDEyYjlkZmU1NDk0MTk5ODhhZDliYTkzYmRiZmFmOWY3Mjg3MTFmYzdlYWE4YWY3MjgxNDZhMjE4NTVlN2FlMzY2YTIzZDhhZGU3NWVmIiwiaWF0IjoxNjA1ODA0OTU4LCJuYmYiOjE2MDU4MDQ5NTgsImV4cCI6MTYwNTgwODU1OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.vu3XIlc3sm9PXopODjevObcMTC9dqcajr3_MCGXhYTBuizyW26W3AdW0dkCEoq1eHEBrDv9oyE8fG_53AUmzZ62Cx6cZOQbYtipe7Rq0XgwHu-9Rt0nZyC5s6gl2apbW62BxOe_UJYW3QzlI_ia317e3T0agtCGgjEGrlgSWy1EbMo61OUNNm-ayUCshEXexyn-Oo3Txkad5mz3YHOTGeUxPlNFlsQTHx62fZ6sud1qt_mnRY6I4MZ-DthtlR4GWsM60rOMgPHq9kx1v0Zv4ZknxPx1w1z4aa7wsW6scP9CmXESA6IWWGXLkeWu231wEYdEnpSovDj2FKbMyUg6Qdg";

//HOME ROUTE WITH ALL Pets
router.get('/', isLoggedIn, function(req, res) {
    axios.get('https://api.petfinder.com/v2/animals?type=dog&limit=100&location=02180',{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then((response)=>{
        //res.send(response.data)
       const allPets = response.data
       console.log(allPets)
      res.render('animals', {allPets: response.data })
 })
.catch((error) => {
  console.error(error)
})
})










module.exports = router;