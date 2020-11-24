const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImU5OTJkYTkxYWE1NmY0YjM3OTU5OTgyZmE0OTRjZTUyNjczZTcxNTkxZjZhZjMzYjc5NzhjYWVlZDM3ZmVjYmE3MGFmMzA3MDdiOTBmNDJmIiwiaWF0IjoxNjA2MTkwODAzLCJuYmYiOjE2MDYxOTA4MDMsImV4cCI6MTYwNjE5NDQwMywic3ViIjoiIiwic2NvcGVzIjpbXX0.qU-bgd3cFZUnOwXlJ4MkvL5d2T2t5UvFtD0hi1BYwYjxJGl0p7YbMRm7hfmMQ48qGCLwkqZ1Tigp1cnLuxsR5GsDOoJ_6iVWXXKaDopLYjpHdhC2NpVL04pYmaH2tQkssUK0n_o8DGQCJS58YfmwtvJHWq4un4I1L2nLUSF4vkN7OU23cnRpl6Mt6alVIQ-hgS4-lLkluRZXb8127TC2tKsYctfclaML-NVUYIUMAIcUASm-Zyxz0IURBloIJ60jhXMMSbGT8sBd2E1DhwrpqKMCek_tOu-h8aPDBcWu2zfbp0CfVIvywXGrnjT4eGpNxIQpHOLLwSQFoFaVuQYlUg";



router.get('/', isLoggedIn, function(req, res) {
    let zipFilter= req.query.zipFilter || '02180'
    axios.get(`https://api.petfinder.com/v2/animals?type=cat&limit=100&location=${zipFilter}`,{
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