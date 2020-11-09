const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImFhZDVkNzgwMjRhMzYyOGRjMDMwZGY0MDZkN2M5MWZiNWJjYjVkMTkyMjM5Y2FkMTg5MjJhNWM4OThiNDlhYmE0OWFlYThiOGU3MzdlZGQ2IiwiaWF0IjoxNjA0OTQ1MzU5LCJuYmYiOjE2MDQ5NDUzNTksImV4cCI6MTYwNDk0ODk1OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Nb7kMPMxRSK0MNwlIjT8t0gH8SjzPG6_VNSTcIrxcFz7hXgeKabnmnNGr9TTaybEZWx5jZa4PmcmEjHi4SS47QLq1btznf_ShovKy508S6ipoXCSDZXOrWB6zOGxVzgVgVH7KUxQeLEYBLJ-oAYPqRIPsjKyiberawx9Kb82veOBsJvRahNUtE9rsG0PAexZHLiaxVihvw37MJlugDGTFeiyeDH9LSii30XRzSeQpJuc4mg0weZxPWyPIYRviCK46TwOEbwryvnFbQy94RnHRQPDVQgFW3hjUnjLNqPsIE3dPjdX0YNEgFoHnqw1w_Tv2jlUr59fEGNDZWWT8dEgxg"
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