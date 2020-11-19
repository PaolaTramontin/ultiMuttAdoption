const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImFkYTBlZDk5NzNlMGEwZGU3ZDdiMzdkNmM1N2E2M2NmZTQ0NDg0MTM0YTQ5YWZjNzE5YmMxYWM3OTg3YTA4OGUzOWVjNzYxNTdiOGRkMzhhIiwiaWF0IjoxNjA1NzQ3NzE2LCJuYmYiOjE2MDU3NDc3MTYsImV4cCI6MTYwNTc1MTMxNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.kC-CpYTBqJF2lrkK5hAd_4elPjJKwKbfS9vWX4zsU9B8E7Ad9QtKeHx3Yk04Sp7D2tBc_cOscGHlT3HvlrK5QqmmRbADfcjb4q2xRhHldUCGDirogVX34VLc67kBUoQmDHF9FO9_syu5QSjPzRiL3ivPGWqQHGC0Nl1cdxgydJKRztB3b4r7sS83oR005YbX-IeUAF8cmiuDjbLlE0DjuaPMRrsHuS85gK4Yj-CeqOmL3_ABJMRul7pLHBID_lXLLp1R1UbZPhtnFntqG6YwsUp1gBhBQ6DKIFWYXwOZliuouhkezSm4jopfXEzG6dmzFPDmR4M9vvi3rYZL_XVwzg";

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