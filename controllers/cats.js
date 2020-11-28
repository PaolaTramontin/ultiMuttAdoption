const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6Ijc5NjIxMGUwMDEwYTQ5OGFhOTc5MDczMWM2NjkzNDU2OTE5ZThlMWU0MWRjYjY2Njc1NTFmOTcyZDM0NTdhODRjMDk2NDY3N2EwODQzZWNjIiwiaWF0IjoxNjA2NTgzNTk5LCJuYmYiOjE2MDY1ODM1OTksImV4cCI6MTYwNjU4NzE5OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.OB778Xkm2vCCwDHEiBHrgkf0sLOVak5vj5NdYpvCyrpJjOEL-hby4F77BEyyNmBFoJvaqgpcidvqjPFjLnH3T0kZ4NKhReeXagDUsV7toNt13o_6hHr6HSCDvSEvCM6dib2kIqEdQiqoVi9tat4ajQtFuxGoAcfqsG2nL4FYu1Fa-Jy921DUhpNBTDTBODsBmlCjHIYDBb_G2bZPqW5y0SWiz1znRSr-cSvXKsxQlblijA6SUAMs55_3WHHFq0k-sSVyylWOg4N_0EeE7797VefisRQovBMGZfupZA-6CwCSbmMUlAjFKgDx3fIGvqffurcNKALLRu6CYweIb9rpKw";


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