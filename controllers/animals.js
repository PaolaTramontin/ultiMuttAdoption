const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjkzZGQwNjJhYTQ3YmZiNTg0MDZkZWQ0NWE0MjZiY2E3Y2U0YWQwMTg0Nzc2NmEyOTQ1ZThlMmY3NTgyYjNiZTdiYzAwYWI1NDQxYTlkMTAwIiwiaWF0IjoxNjA2MDA3MzMxLCJuYmYiOjE2MDYwMDczMzEsImV4cCI6MTYwNjAxMDkzMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.GsGX6wnAY3n3Wg_Ub3cEDZPN0jmLOA2IaZxF-jtEmyWO8oNvAhyeHdeX3kuljcI3Htr2ikJrU0uS1F7k8DEVHj6wBhMA12nRVZFkMjnPkLhNcnYxJciXW5YQtGNEPbIOPrsC-8Q12Sx2zQP3ZUt-2t4LNX8NSC0o2Gb2dJZMdL060qElUx5gJJ2YC0gv5VEr9VqwYEPOknq0iQGtBHS6jHtK6Pa7u7tPbvCtxvgIfdaqFfUT2HY-VMoPvqJ4t-35499ypO0i9pXM2aWRmDFkjM3dOKsWMl694PXJLUmLFJ9XzVnfxy2aby_ICvBYwCBuwOJKUSQON06PX1FU2Av82w";

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