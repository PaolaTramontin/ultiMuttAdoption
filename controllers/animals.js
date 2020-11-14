const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6Ijk0ZjQ5ZmEyMGM0ODUyODBlNDQ0YTc3MzU5ODMxYWEwNDcxNDYzMTQ1ZTFmM2NiYWQ4MWMzZTJkMTQ5ZmM3OWM1NGVhYjQxNWMwZDQwYTg4IiwiaWF0IjoxNjA1MzEzMDY0LCJuYmYiOjE2MDUzMTMwNjQsImV4cCI6MTYwNTMxNjY2NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.L_8hA1iyBFCkibE0wuBYyceSPGVfEd5b56dT22t_CdntaZVMk-Z5UMAin-kDwbTEwufcAih14ksO9FiB77C9QPvi_Od9BivJaunO44iT4HTI_emu22MPj5DWhp-CtPtA4aVXguOdrLVpS-HK2Hn6RREIPdSqz4-khWhCyvKXC6iP_My2Ad6GEk0g3ZlxvTHyELgYfaIpp3xHIH0u2cjUI_gmHagJYMMxYQwUINHfzKTdKb7v5Gqofq7p-BdsQQ3w5uJOGLXZdTHuAwm9alXHOlymfot_PIEWQ7DBLH84cpj9NhUvvhoTn9rHf041H-q1uAlGr9rYsGZWJrE1Cw9o4A"
;

//HOME ROUTE WITH ALL Pets
router.get('/', function(req, res) {
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