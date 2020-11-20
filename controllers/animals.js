const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImRlNjVmMWNkMTdkOWYxNWM3MzhiZGQwNGNlYThjYjgwZjc1ZmRhM2FlZWRlNzEzODVjYzY5ZTFmNGRjMjFlOTYwNjA2MDNkZWYyZTU0MzFmIiwiaWF0IjoxNjA1OTA4MTQzLCJuYmYiOjE2MDU5MDgxNDMsImV4cCI6MTYwNTkxMTc0Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.nFbwTnU7hFUGfH3fYY_JQPypMEjhCUWP9iUPCRkig3qaUYPJBkQ-RQS6LFjfFFdtC0dNPU_iSS0Pq5rQe8WpjoAYs3QB59NhkJ6DkzonUTgeRKopa6zdWJcrfM5FG-A3jVaUfczekYIbVDLZA8E6jsk7kfWpY8zmw7v6kU38xfrfZAcbldv9ZTk44k7zl7vwOZbK2ZJmoCyXlm3nYJWTE2FG1YP7jOsMjjyYAvp6JtmTc7Z0CVg3IMwpcLpyRilpcawQtM1M4okNW3nGB_SJXwAzEJTvqmNY7L8WFSDsi99Kf74v34Y2Ir8gVsyIXgdL-08JDuruW60UAgxt_nzaKg";

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