const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjFjMDU3MjkzMWJlNTgwMDhhNzc5YjliN2NmNGVlZTUxYWUzNjFlOWM1NmNjZTEwNThjMTRmZjQ4ZGEyZGU5YmFlNjZkMTc0YzFmMWZkZWZiIiwiaWF0IjoxNjA1OTc2NjI4LCJuYmYiOjE2MDU5NzY2MjgsImV4cCI6MTYwNTk4MDIyOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.vcoZN7mI55DbaxxcWNAVnLTYruZeL7mRfXJ3ou9kyK38UF4lI2-5iIRSSNb-bTesYS1neyhdPfmnyh-SHYr13cmZ9NYSxnjKPPv4pzBZACOLWwfNrkJ8SAXlRnx4HSDKGQAuX_5_X598uBAgE23Q4TQzfoqZdrAmyYhbxHFd2mrkbuh3ZfywWGUL7P6QZH40QqwVY02CTaex0K4RbBQZ9pCiNL_l8FuEQHJVkELHZyldvcgI4D0dQ_iv7OpQPAV0JMRGMw4cBl5tI5Y7Q2y5SGwgAl3Si6oVFgvwLx5HZo7h1ouaisUcdCuGTjySJeIyDImZlNHMumqetav2kWNthQ";

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