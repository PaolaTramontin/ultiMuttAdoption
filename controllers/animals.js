const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjNmYzEyZDZmNDFmMjFkNzc1N2RkMmJmNmUyODQ1M2U0YTJlNjBkODJiZTYyYTA4OWRlNTA4NDU5NWNmYTQ3MDc2ODg5MTZhNmIxYjBhZDJhIiwiaWF0IjoxNjA1ODM0MDcyLCJuYmYiOjE2MDU4MzQwNzIsImV4cCI6MTYwNTgzNzY3Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.d-eZw2kVrnHsDPLfu2xytEJxp9hN-lReScxgoSwiEVfHOIX3nMPDVrDl7DqSlPQw7T7-Vjs9c-WuiLAObDilPR_r53raDaz5lYD_y1TyT3Eg7oHK7eVVZSNyBrXaCnYkLKjxwDa2qY7tvji1vH53MiXWwJnPnV1_eldWj8py691MjrXSdc6ojkQVjzVupiOWKvJduaMpJ8Og9eMTUmI0MNx3LcVmp0qj0D6mwx1aPClmlqltfbo16aS1lY97Xt-c4dxS6TvqsiDtmmHv2g8X0hgFloc4dl2rZiEFRumINUYLW1KPBQLrQnnMzZQFhJ5B7lF8kTHTE07Q-HMitGMMnA";

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