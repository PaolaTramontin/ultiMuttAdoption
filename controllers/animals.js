const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImVjNzExMTI5YTU1OTE3MzFmZjdkYmI3ZGYyNTE4MDkyNTlmMDVkODk2M2ZkMTk4NzMwM2U1OTYyNjBhNGZiZGI4NmY0NmVjMzM3M2U5OTQ2IiwiaWF0IjoxNjA1MzE4MzIxLCJuYmYiOjE2MDUzMTgzMjEsImV4cCI6MTYwNTMyMTkyMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Ui2HyvM2nFjWuZ5wHE-61-aX2duWD6CxMJ1LH0W0tz-oTG-7gNkXASESHrfU9maYMfdgfuMvnU1hJKiJCGPjR74vMKUWG8iv66wH06lF85bSSAYI1EBbYntBI1ZkyDMxfe2S6k9X3L7ogW42gsAHTZ_37NfpvrXo_KIJ2XADEzfkhbaOjAUMIArREqrYZQpvdidItXldTXSoplwFt8-LouQhR2EYhI72g9QgiPkpdj8i22El7Y5wen5BaF1IfMRmy9N8JDxgaJCm-9xS8jSgPrAxbjUriJfw4hq38SH3dsx60hgfHg1ZIXf-5fDJXOEy4gLRx1fFJGPYFnF40L_BqA"
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