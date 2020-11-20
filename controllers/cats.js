const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImY1N2VjZDgxZDMwYTRlNzIwM2Q4NjE1NWY4NTMwYWYxNjk1M2UxM2ViZjhlMmQzOWVjYzg2MjkwYWY3ZmVkMzRjNjJlYmMxNzBlMGM5Y2MyIiwiaWF0IjoxNjA1ODQ2Mzc1LCJuYmYiOjE2MDU4NDYzNzUsImV4cCI6MTYwNTg0OTk3NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Povn8EglFjQzpHqu__alG09-4YnTJaJZ3qqXY7VprmyBDdCc6-Ey8qAOpG-hM1O9eDU0pcT440rdsNyJM6-u26xTWsDfeJRLF2MkwpPawJd1H8wXizb90qvEt63Y2CNJ6gihgIT4QtNFQv9cmDrQKl60Jwy_VtTI5KVlrDQLO0-Qgds6sKk4fIakVGSZNOvb2zWScAeg6j0kKxRgMAz0xQvS7-fn5lGLqy9EOb_MSqe1jkD1FMiPXOm1dJ8gu3LDnfBwTFjlFK0knLtGtyDu6AgB-wFRYtSNMLKg4VazQhn9sBScc9YIiAZ8kcLBriU3av53MBmgpLFUafyf7L6U2A";



router.get('/', isLoggedIn, function(req, res) {
    axios.get('https://api.petfinder.com/v2/animals?type=cat&limit=100&location=02180',{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then((response)=>{
        //res.send(response.data)
       const allCats = response.data
       console.log(allCats)
      res.render('cats', {allCats: response.data })
 })
.catch((error) => {
  console.error(error)
})
})




module.exports = router;