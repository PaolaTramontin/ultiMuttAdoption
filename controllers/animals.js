const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImY1OTA4MTIyYjM1MTVlODE2YmQxN2JiOWI4ZTA2MzJmZWU4YjQ4NTVkNDJlODdiZGVlYzc5NGM1NGYzZDcxYjQ3NDBmYzU0ZjVkZTdlMGViIiwiaWF0IjoxNjA1MjkzOTk5LCJuYmYiOjE2MDUyOTM5OTksImV4cCI6MTYwNTI5NzU5OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.QUJexrwKOuxzm5f_wkgRL0rVjDNW09f9VMcnGWCnDudGx1jpZoM_GtLgCu1ponNGhYnXjieXnJNI_3EO639jCKumkOm7asCCSl_16nfqAzOuay_r6H-0ABIFum8ioHwL1u_8jZ8JMGaCAqY9oV1BzoHDzq2Kc3bvYMQS4GGYNlXRUfAr-9Ec5x4shncrGuYo-l2jUK1S7Xp-BxU1qh_KQXtjkPUbfascTBHsIB7ZVK4UkjxispkSGMRFpekgUNKWev7vnRj8In-4p7ZL4gf3M-rLeN8FxLvrfVWDw7tBNcxcoFUUt1pqjZu-vz9LglCH0F3isGdqS_LsFw7i38QcSg"
;

//HOME ROUTE WITH ALL Pets
router.get('/', function(req, res) {
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