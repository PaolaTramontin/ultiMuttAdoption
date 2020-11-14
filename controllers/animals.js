const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjRlNjlhZDFkMGU4NmMyOTU0YWM3NzMxYjFlNDAyM2NjMzZiNmJmMWQyZjQ1MGE4NWZmN2NkYmQ3YjhhZjU3NTU0Y2RmNmQyMTQ5MDU1YmJlIiwiaWF0IjoxNjA1MzY1NTQwLCJuYmYiOjE2MDUzNjU1NDAsImV4cCI6MTYwNTM2OTE0MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.JXaJxSJvDkmbPYh6hu_K_kvTENyO06kCSV-hzyatVnCVfPLnqILN6RLyjSgxF_1l7bpeCs7EZN0jXLLiKUv4wJlbJmARnX4RZPWPojbnBlIET2HERE5gcmYOoebz6A0eyEwd0YUA5ht6gUzdKWhVu3ndHTo6p_vWdu26eNPawXCAfyrMtiewEinswVO9VMIBzXOLa8uvl20gNPHHxijjVHbeOj-FDnluW3_jFImJNv8b6JnxTc2AhYnodX7h75XELuDhv9p42Gi_LnKq4NpmmDURiMJVvk8w5rOdREdUi-e8gSrlepSH4h0IxwT9g-qKyR0A_mHccg8kTb2xFTgsFg"
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