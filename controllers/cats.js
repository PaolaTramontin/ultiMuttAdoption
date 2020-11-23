const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjJkMGJiYTI5NDFjZGU0NjBiNmJlZjFmZDgyYTZiMzI5Yjc4ZmM4NTYyMDBmNzZiMWI0MjRmY2ZjNTEyYjY5MTU5YzFjYTM5YWRmYzNhNmJiIiwiaWF0IjoxNjA2MTU4NDE4LCJuYmYiOjE2MDYxNTg0MTgsImV4cCI6MTYwNjE2MjAxOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.KpOQWlvsOZqpfyaM6IwlUpEPdYDAvp0O84QQ97ldXr0MbV7_BR_83W4utIAEt1XtxPyHcnvGuQDIyrd67wi9jUDHk4M7sSrv5jWSVm2R-QAhlUA7vL0m1sdvPKE-XrUlkENLTlZnXR97IbmqoIs_oEeQ7SHIuBZ4WfoanUw7swULPWPDl865qxKq3k1rfBk2VMnGAzOEWA9_ymBuNJC2nYX1z3I9M4pl33JJQgKdzE7mMqYwwEirMyoVDv6s06BYBgXULFov5D0P8rfvbvHJ41w4Q-jtHgjduyeMH5vr5xvMuBCdfH32KpMFT0gmB3MciW_ltcgYoB93vavCBOHVbw";



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