const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6Ijc2M2Q4NDA1MDY0ZmZlNmU5MWY1MmZiNTA5YWQ5YWU4NWE1MmRkZmFhYmE4MDhiNjFjNTI3ZjZlNTUwNDBhZTI0ZGUxM2U0ZDVhNGJlMTEzIiwiaWF0IjoxNjA2MTYwNTY3LCJuYmYiOjE2MDYxNjA1NjcsImV4cCI6MTYwNjE2NDE2Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.DIvklvK7PGL6ctZuuyvj8nYVESRVrdoHN6N4_x5dPKO9N0KMKdc8-IfMvNr0AkH5mOGEDRaZDZwRjKSkWkv4XDK-nUZpeV0p3La5Kf_vD6w4qumn2LdFzvUnS0KuU-xFTnqanCwsZi34qfbVXrvtRXSDUXa-t-M0lw1c6kNVoWw-CuHz7Jw3oPYlhr-PPLELxra2iK8B6QxzAwecN9apBni4Vk8uOT7FTk2oBEXePKKTDAeXfZtwxk4gqsdMvUE_dmMDmD7stMg0JpIKHhHxfVATkC_rWTThE87Hc0MaOgo15MCE7u6cWXHxea5IiaInbi67tvP7pedkVFZFX1PKcQ";

//HOME ROUTE WITH ALL Pets
router.get('/', isLoggedIn, function(req, res) {
    let zipFilter= req.query.zipFilter || '02180'
    axios.get(`https://api.petfinder.com/v2/animals?type=dog&limit=100&location=${zipFilter}`,{
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