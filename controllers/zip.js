const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjEwYTc5NjFiY2IxMzVlOWRjZjVjMmM1OTA5NmMxNmI3MWEyNWM3N2M0YmZiZWY5OTU5NjU3ZGY1ZjlhMDA4Nzk1MDE4YzA4NWE5ZDE0ZjRkIiwiaWF0IjoxNjA2MzQ2NDYzLCJuYmYiOjE2MDYzNDY0NjMsImV4cCI6MTYwNjM1MDA2Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.knqkotjvUx2Rr-FoLOe9BLwEfkLFH8_WZczvIWgxkyUzNQmlETwRGwtRCkqhNPbBsbZLMJGyMks_p9QwDj-379cRoTupn7qsftIQVky9LX8xk7h1AMKEWG5M_Whs7Hd3TT1Gs1V9PshYJ0uv02SaV68iHvJo7PVG_SraU16rKRavBhourHFRtw5ub-28_bt7OO_TYIL280ArmKPsVZTs4RRp-JIhlnECmvHiayy7TL0bKoLtYHZ16-hf_VRShygJ6mYFML1H3hdDCGdlSYJy8MBacoPG-Fmhr-JxiM87BE5kl0V3x3-2LdNyW4ZjX_13OAmo_sqEG1hizVDEIPUBzA";




router.get('/', isLoggedIn, function(req, res) {
    axios.get(`https://api.petfinder.com/v2/animals?type=dog&limit=100`,{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then((response)=>{
        //res.send(response.data)
       const allPets = response.data
       console.log(allPets)
      res.render('return', {allPets: response.data})
 })
.catch((error) => {
  console.error(error)
})
})







module.exports = router;