const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const isLoggedIn = require('../middleware/isLoggedIn')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImQwZGYxNzRjZWE2ZWY4Mzk1Mjc5NDQ5OTkyYzFmYjA1NjJiYTYwYmM4ZWQ3Y2NmOWY2NWI1MjQ2OWI4NTYzZmViMDgxM2RmNzJkNzY0Yjg0IiwiaWF0IjoxNjA1ODAxMzM0LCJuYmYiOjE2MDU4MDEzMzQsImV4cCI6MTYwNTgwNDkzNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.jN-CunK-ajumKfzHjDQLFSpV4V0QjhWlQrPN2z5kTZSUpGprAtLPhG66M99HscKLsclZnhJJBoq2CKPxEBzNicfEFqYqQwrgot2VMJKJgQt2lobGeGEzI_PosgWONqJlqMh2qVQj075V5N3mcWi5LNwKqcd_uO3wbOqO8yQOZMeqvZiNBzrf-Y4GYKSuQLUXuuh6NJY-q9UJbF6BWI0sPo7TKF2WjjJs_axjdVwnJ99ddHeTuzk7ucaSO_Sxst9CqtmZbWXfAbj66esvxLz-gYs-pOaUSwaPoJe8J-PBoaMlAuhxioypsY7AIQ6DpeAVtWBAo9FxXu7XrjLXhJB8vA";



router.get('/', isLoggedIn, function(req, res) {
    axios.get('https://api.petfinder.com/v2/animals?type=cat&limit=100&location=02180',{
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