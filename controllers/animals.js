const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjBlZWY3NmJlOTgxMGQyYjAzNWNlODBjYjRkY2IzNjZkOGU5YzM3YjQ1ODlkMzg5MWUzNzRkYTRmMWE3MWNkODcwY2E3YTNjZDA3NjQxNWJhIiwiaWF0IjoxNjA1MjAzMTY3LCJuYmYiOjE2MDUyMDMxNjcsImV4cCI6MTYwNTIwNjc2Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.F6d3kSSNUS5d2foHx_jCKl2f7jmtmi9GEo9fEqdU8d8kE9-AMzqAsYK5n4En2p4R-8HuDSDwG5fZhlwB8uphKCPJyZwQK8NH3bmvYeklr_utFtAMsMpm-BArT8yhgk7-KW7q4lf1CrfOVRrEnXyLn5613Vj12x-xPo9Ii622xKwD3WEwxykyLCMTg1rhvKqdiS0TKEi9_ysRruaSnEvvJAp3Ie1XAlvWgQziQz-LHSsEFrjGU1FC5Ci8K4pgxyMUhbwYBxmGf-gLF3TMhxTDyuYTmCLcu0FXQNrbeGiPl8-0RJQrX645gxZfCa4Q6Tv5-XcoWP50rU_1SXJhHK0D8Q"
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