const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImY3Yzg3YmFiNDU2NjgyNWI3MjZhZWI4ZmExNGU5OTU4ODIwMDM2MzFhZjFlMTA1NjNmNDNiYzJjYmE0MDZlNDJkY2VkNGIzZDRmOTMzNDY5IiwiaWF0IjoxNjA1MTI4MDU3LCJuYmYiOjE2MDUxMjgwNTcsImV4cCI6MTYwNTEzMTY1Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.wxfsR1JUWLUop5ZgDCbEovjOqVqdRSKEYUKJ8-ZF6qYgX0p128wznOFqcYYu5gM2xPS3j7xNJogUVf9W925Cho6V6tcwQlihxHyxbd8ufqu7mleF_-0edUswsyCWE85hO_9Y19zy8op6g2eue5I7yJIF_1GDKjYfgXRraVSN0lbPq1LsQjADEXZ0OX4j8ZfUWTUXYmE_B-g7KK7aXvmz2DG7NDnrGmIPrZzkrTvTUEMudfpVR73ECMoEF-QIZ6pAsAn9kjIhDQ9yQ1fNCvusKpAgR8BzU4-R9XFM57-BZ2no9j9Rn8xEYkV-AdGAzCRBimdOAevArf2AKlFOiMMDNA"
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