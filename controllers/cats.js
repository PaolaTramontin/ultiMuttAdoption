const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjM0MTEyODNkODgwYjM4NzA0NzNmNjE0ZTNlZjgzYjMxMDVmNTc5YjBmYzhhYjhlNWZjN2M1ZDRlNjBiOTUxZWZhYmNhM2JkOTcxYjU3YmY3IiwiaWF0IjoxNjA2MTk0NjE1LCJuYmYiOjE2MDYxOTQ2MTUsImV4cCI6MTYwNjE5ODIxNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.H_5Mpo-Z7fJFCVftDyUJczW_hW7ebs7v7O5sbWEYkBnaofWEjgG6-goGLzHXrc6CNV-7HYtfbUmZhXxHPEnhhlo184Ep4iQf4batgj53UEaseO-5lP9uD6V-LJG2mvaESeXtVDN2NImeVshQ0StpMfmM8AhJ-_llqLW8G7L3bN6etdtJBNf-NlMTSaiU3hW8bvUQ4Wex7T1snzMuOzBc1z4e0c7E1N_dzGmo4GjskEvECx6f7Eb91u5EojbEPB7788S4Uy6yUY6X8KEoFQ1fqGIR3JXyKDFf8qLFjUOT5SpuVxQwXHRj5aSF8nVnT_t4QQhBkKQzJHsTZTdSU6Qbpg";



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