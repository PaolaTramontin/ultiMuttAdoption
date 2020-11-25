const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImNjZDc1NWExOGYxMWEzMGU3ZDBmNTcwZjM0MmY2MjQxYjAxNGFjM2YxODVmYTM4MzgxNzBmMjQ1OGQwOTg0NWE1OWQ1ODJhMmE0YjAwMDEyIiwiaWF0IjoxNjA2MzIxNzkzLCJuYmYiOjE2MDYzMjE3OTMsImV4cCI6MTYwNjMyNTM5Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.rVsNerl2YSAzPURwvS3g2rjZenBMaW538E4WZDOUDptzbDLWPLLRaAZdWtl-YtrFGkDDlZHtfMA2hN1ixMGjo5S4AL6VZz32THEf6CpmARLVcnuW6xQAq_av5zDt8EAJfAgBNDH9d-iizJugtfyRfIdFlwaQxP7kwWYiPEnmy3v5R19MiImVM7t9vKjXdtsk5k1VbZZgqjcnOhxPQMSz4VRWBh5fNffca1MuiYUt5O9esEkm3Dc53C0IomLyyhLh2P4RZ-rasaziiJplyc27x4CVX5IU3ZzW3oqZgJwNiExnX7OFmrHK_wetBjQfd878CJ_wohB9F2NdAZwVGclK0g";



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