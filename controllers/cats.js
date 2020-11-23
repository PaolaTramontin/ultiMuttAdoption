const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImZiMzBjN2VkZGUwNTc4MTM2YzIzYzc2MDM4MTliYWQyYjA2M2JlNGNlOThkNzViZTVlMGU5MmYxMDIyNzYwNzJlZjI2NzI2NWE3M2E0ZTE5IiwiaWF0IjoxNjA2MTY0MjQ0LCJuYmYiOjE2MDYxNjQyNDQsImV4cCI6MTYwNjE2Nzg0NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.Y6lRaZ9j-K54mNtlKF7GR3sBYCQ5ddUViqYzXLUg58h677JgiBk6eEyPVZgLwkkhxL0A4GIZ3e5wJrBl67NkPhC4vUxHG0NdI-UHrvbs4fZ0gCD7zlbJK5wF_6Sm9Fcx6a-TEOLidY1frIqr7nxiDVVHqdsTBlWDqekbonpLL8h2DooudtsFrdnlgxmJrAx-FIepkB_rEWT2LSbpSIRRGs8T6WBW49oCl_bJiTWpxnAmB0AolI_bhcKyLoA_dterVX1AXLOnMRWggmFaA8mOI2hG5jhnqRTKmT3XWPEZ-XV9OrMNHArDMF_pWKHIrIxRdsjXtqdlt1BQlSIrguhGXA";



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