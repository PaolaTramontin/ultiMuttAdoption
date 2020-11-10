const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjY2MWI0ZmYwYTM2Yjc2NDdkM2UwNjFiOTJiZWZlNDViNzA3NzQ3YzQ5NmQ3OWJlZThkOTEyZjU3NjdlN2VkMzQ1ODQ4NTZkZWU0YzI3NjE1IiwiaWF0IjoxNjA0OTc0MDM4LCJuYmYiOjE2MDQ5NzQwMzgsImV4cCI6MTYwNDk3NzYzOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.ddeM3Tl67isFxrEba6yIy-Kdx5QyFsrOH8qYiO80SL2giJFdRSCxvbY72VLlIK_YLnpsq62B4wak5JoB70cAghM8cTHYVlzehxo9BSYh9vGvq5OOL_-YcILcPhVJIFbTvTljiyHinPnGE9CRQyzlJfidoUmXxJEfDTS3MNnFsJoFw7AZJ2w3rce2J5a00DYF-76hQBBUkeV58RnqWlqxp1LUVQ1jbmtSVRVbzYdO4AZ2GAQHjSnjOBtArPmMB6C6_PLs_dZMzDlHcNke6rXgUVJowZaaSRKF0LUDssrPJ4DGyqoocMhwmzqvdLaxYrd4_midBhxye_ToHHawNg-9jQ"
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