const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjMyYzM1ODYxNWY2MDE1MzQzZjA4NTIzMDNkMzQwNDAwMjVjNmNhZjNmZTBiNjQyMTgwMGQ2ODNiMDJlNmRhOWM1ZjU5YTk3MmYwNGRhYzQyIiwiaWF0IjoxNjA2MDE2MzYxLCJuYmYiOjE2MDYwMTYzNjEsImV4cCI6MTYwNjAxOTk2MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.hOponHCoZ9xBTDqcyBdBkIEPhpVFlzPdApRKDCSVF6Zy7NWNfpgj3SiZFDfbknbFcWDvTW5gVTcC6uwoFlhh5L2Fh9Y_FcoveA14OS4HOMW-CYHucbWZzY1bd0rAv1fJIKYHbJkQ8QQTv1e9aeTXd51QQcfq5rMafXisKpA6fvtD69MuTcVCXHd68zqgBGe3YcJ3B7m2b3SKF5x0J5Q7jEpxtyV5lC1p2wJAsIT_lCuIfsQ2DwAVYo4zmCRWyIAXe_bZUGcD5_OArVbyBZA1qKL5SFGhNoEHqP92X2zbOj4Qc-4J4T4gA25PLX1hp8JxKnjc-wI9MtFx0lJX9YzR_g";

//HOME ROUTE WITH ALL Pets
router.get('/', isLoggedIn, function(req, res) {
    let zipFilter= req.query.zipFilter 
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