const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImM1OGJlNzA0ZjhhMDk0YzA0MmFiMGUyNmNlNDZkY2FiOGIxYWNiODcxM2YwNTkwNDA4NjIzMDA3MDY2MzkxMjY0Y2MyNDgyNWQyYWM3OTU4IiwiaWF0IjoxNjA1OTA0NDk3LCJuYmYiOjE2MDU5MDQ0OTcsImV4cCI6MTYwNTkwODA5Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.x_w8DNWiPtvtEiYmyNZaFUMXhYyXtVm0Gy5dmGteiAn_xp6lUVBgvHSWlBkmk8zdHV1n_mmpBWFBGDVHsjzcR65CrEBY57tQfidPQEU3N0rl3eiTWpkdiVT-3P5bg4pN6c3q6AaW5pMPE0Q28oo8T_GIjl6XtNpyJ1mR4WegO73HrfyaQR9CxHCwokmfuvb867dEC1563KaSYR45yCkIlvvDWipP7sMFLymN4FxVEXGcrdH2osXRRi53xwAlSNDWSGBAXiB3DWgjs4FT_y_092UA7wMVO8aY392L6tpJHIM8W8lHBSiEJMYkeyHPwDpEhqVdKXUG1Bup39x3T8D5CQ";



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