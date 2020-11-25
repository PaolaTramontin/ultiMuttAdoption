const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjFlMTQ3ZDUyZjU3NDIyN2Y2YTVmYTUyZjFjMzIzODQ5MWQ1NDFkZDQyZjc5ZmY3ZTM2NzZlZDU4Zjc3ODIyMmY1NWM3MWJkMWViNDcyMzY1IiwiaWF0IjoxNjA2MzM4ODg3LCJuYmYiOjE2MDYzMzg4ODcsImV4cCI6MTYwNjM0MjQ4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.Dk8d_SQpMW19w-r-9xq-_OT2gx3u733U_sdiQzE1HWgXg-D2xU2hS48SXc4R7kZCbi68-enAKMU2kSo_0oeNpUokFCLP1nVsx0hZf5y4Vz9e6ex7kWtlDpXPmcvUYoZbl3U6tVAXjPSnGNPfLjJ1rq7OrF4PKL1Bt-S-3ydK64OiLCF43Wt8Z8I3399yJj3SoiyRWBiNg-ejABZAn17PwIen6Z8Fl3btprP00rYZsdCYEWYipsultTKKDmUXkesJqv4CMp3RSY1niUiRGNttgnWxL_p8fL1j9jZxFbWsCcJzWPLSG1wgRkBtJb3gaEZHmpDjfOkrtqhgyQiXOGg59g";

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
      res.render('animals', {allPets: response.data, zipFilter})
 })
.catch((error) => {
  console.error(error)
})
})





// router.get('/', isLoggedIn, function(req, res) {
//     let zipFilter= req.query.zipFilter
//     if(zipFilter){
//         axios.get(`https://api.petfinder.com/v2/animals?type=dog&limit=100&location=${zipFilter}`,{
//             headers: {
//                 Authorization: 'Bearer ' + token
//             }
//         }).then((response)=>{
//             //res.send(response.data)
//            const allPets = response.data
//            console.log(allPets)
//           res.render('animals', {allPets: response.data, zipFilter})
//      })
//      .catch((error) => {
//         console.error(error)
//   })
//     } else {
//         axios.get(`https://api.petfinder.com/v2/animals?type=dog&limit=100&location=${zipFilter}`,{
//         headers: {
//             Authorization: 'Bearer ' + token
//             }
//     }).then((response)=>{
//         //res.send(response.data)
//        const allPets = response.data
//        console.log(allPets)
//       res.render(`/animals?${zipFilter}`) 
//     })
//     .catch((error) => {
//           console.error(error)
//     })
//     }
// })





module.exports = router;