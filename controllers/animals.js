const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImFkMTdjYzZiMWUyY2Q5NTBhMzI1OTI5ZWMzZDg5YmE4YmVkYjdkMjQ5ZWE4ZmUzNjE1ZDM3ZjIxOGIyMDQ5ZDNjNWI5MTVhOWI1NzRjNjk1IiwiaWF0IjoxNjA1NzQyNTkzLCJuYmYiOjE2MDU3NDI1OTMsImV4cCI6MTYwNTc0NjE5Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.SHD-GBSoaMaMQohkvLtHClOeyxNUnRoTgoGpCnElM9IV1FeY_HAu-ENA1ZSEtC7KIchBXg3xWwMCBCNT1xUj_MsRSl7WFDYv8ST0gxe4nDExU62dRj-vyMANjSxne9YSiRo53mYTgxbRrdnFBo6OXuFEE3uirRFKpjvSYCujx3HN0IH0W9IXsijmheWlfM3T98Ld7SC6fP09lVOS6FCVvBw1OrrqVkFKqRB_fdFyrExror7TKXFdmBBfCMwBRXu0Q-CC15UhOD5u2dMzopM9vGLxyIACR4SC_QWWreBZkUisJwDbuw7slPNIEH4NADAXkC5NqgTEEcmSzSN_y1AgXA";

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