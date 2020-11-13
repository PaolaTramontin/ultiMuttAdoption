const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjY2ODEwZmQ0NTkxZGY3NzIyOWIxNGM4ZmUwMjdjZWIyYjNkZDI3NmM0M2IwYTg2OTZkMDRjOTVkMWIzMjhjZmJmZjk2MjUxNDc3MTU3ODZkIiwiaWF0IjoxNjA1Mjg3ODAwLCJuYmYiOjE2MDUyODc4MDAsImV4cCI6MTYwNTI5MTM5OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.HpsnBJ-6VmHYk6_EllwjdusfihClUB3pTaO2qGFvoJ2ONFi8JC64uSEPVRrW_NepsJVmgxYc6GB2EP_Wr5L9D7qbAv3lj_BDen8USMZbbF4l78D64dmUvqa8lb5R855_R4QruGJsGF6ja_YJjPSf6OW9-A6ANDw9JcFFLavLfNMK1Mhy-NcfahQZ_z5Kzxu6m6z3tcMSmMMEinRZUXVjTIVGSvW03MKUpVcQGuRJQ-do4t447us-47ZtKwYc_f9RudXVATKW7w_X63wyUBwzNcyg1720mvpZR9EELa5WwEF9LDfvJSk47eMRrbAs2Y__EmzXx0h_VE8WL-F4GcbIjg"
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