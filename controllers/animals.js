const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjZlNjk4ZDRiZjI1MWEyNDVjZWIzZDMxODQzMmUxN2ZjNjY2ZmUzZDExMTQ5YTA0MmY3YzExODQyMDFmM2VlZWYyZTk5NDlmNGVkMzZiMDgxIiwiaWF0IjoxNjA1MTE1OTg3LCJuYmYiOjE2MDUxMTU5ODcsImV4cCI6MTYwNTExOTU4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.P1K14E2CcHSJZOaQKfRnj8mo5hucgM3lZnO0-ThthnLOTqzam6US_367UO1XhpLZxklunrx4bVA0l-sGeuyF2o4OhO57OE8q4NY2FT7rb5kVGioeAfvPVgpxPIFIPwa0SbWJWT2A587c-I2N53baAf6kzNwuVPlZnRqKXBR5yeBr5voAqJZn0_2dLfsYfRqMKgc8bI-onwB2WaelIBgFLedL6056dfRqOGclptkonTb1QfN_r2o7LMsEzL6OhGFV4uPmmZubvLCpycAP-EbqhPOk2sKYV6jWc8A4c_ZWxPia3Ozw4-ZBEaDzmeGsDe9krSWPAPtovshc3A7VKwFSxg"
;

//HOME ROUTE WITH ALL Pets
router.get('/', function(req, res) {
    axios.get('https://api.petfinder.com/v2/animals?type=dog&limit=100&location=02180',{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then((response)=>{
       // res.send(response.data)
       const allPets = response.data
       console.log(allPets)
      res.render('animals', {allPets: response.data })
 })
.catch((error) => {
  console.error(error)
})
})










module.exports = router;