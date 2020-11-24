const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjQ4OWYxM2Q5MjkyNjc3ZTA1MWE2ZTA1ZGNiMGQ0NzBjNWE5ZDZlOWQ5ZjAyMjIwOGU1Y2M3MzVjYjAyODk1MGNlODc3YmZlMzE4ODAxYmQxIiwiaWF0IjoxNjA2MTgwNzQxLCJuYmYiOjE2MDYxODA3NDEsImV4cCI6MTYwNjE4NDM0MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.S7uq4EnhIYnFGubq1jK72ImZphIwO_GtfFUtUAM-Mt0Dm7qSZdC0o_NJLYR8jcemZWjYJCJu0nLZLKhrIS4jlurw_1LFW4bXXaPQ7za178G4VRinqM7JL4apsYQdM5YhLYKx8c-sNyQJxz01G85keO3kzeMfDn0jIcGBIARd4xRoRRdHRV9UgkQ1PCmo5uUQ70N8MEcgh1_d0oZ1saxmTzjjaFcTH0ig363AyUMJCnMVae-g_TxoK4-ttV6GywjICHnueDsA4NwYHbvdMSTklrjQAtRES39sX0FO5yQaiscxqDNMYMuj6SFUj8HGVQ4-zzsx1oLnmarYqAEl9FoCsg";



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