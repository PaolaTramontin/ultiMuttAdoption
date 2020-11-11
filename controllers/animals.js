const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjAyNmU1N2U1MWUxNmEyNzczZWRkMmRlNjIwYjNjOTQ1ZmU1MmNmODg2MmMwZDYxY2RlMGE5ZDRkMmE5NmFiZDc1YTExOGM2OTU1YzUxZmYzIiwiaWF0IjoxNjA1MDUzNzg5LCJuYmYiOjE2MDUwNTM3ODksImV4cCI6MTYwNTA1NzM4OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Nm6z5nzjdlwbl7QjsgzHDSgLDMVTHk94XgnK6OP8c6CD2y6IYdeJdH5qP_52v8TN-HNdlasoiP1fm1Rx05o1ikaoqRiBBTsdf7QWwq-VCrgKP5-ri3wvfgr1jGgyLXzi4RaFub5_c5SKYBt5xrXZMm-eIW1PSUkt54PFcwYXqXRrao0BQjvPnfjbebb_tg6-tmwTtIhH8L3FAg3RVZEpxb7pGDwpCOdFjEpq8V1cCZ7tPHVpQ3o5XJqTw4RDP8-RrFwDd68CVj7AyNv2DgLXDttAeeV_RWz6NUSMPrKiVCMtPcnuB1pbNs2whZpHpAsoigliHVe1OY-EmC--quSlgQ"
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