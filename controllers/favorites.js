const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImFhZDVkNzgwMjRhMzYyOGRjMDMwZGY0MDZkN2M5MWZiNWJjYjVkMTkyMjM5Y2FkMTg5MjJhNWM4OThiNDlhYmE0OWFlYThiOGU3MzdlZGQ2IiwiaWF0IjoxNjA0OTQ1MzU5LCJuYmYiOjE2MDQ5NDUzNTksImV4cCI6MTYwNDk0ODk1OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Nb7kMPMxRSK0MNwlIjT8t0gH8SjzPG6_VNSTcIrxcFz7hXgeKabnmnNGr9TTaybEZWx5jZa4PmcmEjHi4SS47QLq1btznf_ShovKy508S6ipoXCSDZXOrWB6zOGxVzgVgVH7KUxQeLEYBLJ-oAYPqRIPsjKyiberawx9Kb82veOBsJvRahNUtE9rsG0PAexZHLiaxVihvw37MJlugDGTFeiyeDH9LSii30XRzSeQpJuc4mg0weZxPWyPIYRviCK46TwOEbwryvnFbQy94RnHRQPDVQgFW3hjUnjLNqPsIE3dPjdX0YNEgFoHnqw1w_Tv2jlUr59fEGNDZWWT8dEgxg"


// POST /favorites - receive the info of an animal and add it to the database
router.post('/', (req, res)=>{
    db.pet.findOrCreate({
      where: {PetName: req.body.name, ReferenceId: req.body.id, Contact: req.body.contact, Status: req.body.status, Description: req.body.description, Location: req.body.location, Photo: req.body.photo},
      include: [db.user],
    })
    .then(([foundOrCreatedPet, created])=>{
    console.log('found or created user:', foundOrCreatedPet)
    console.log('already excited in db?', !created)
    res.redirect('/favorites')
})
})

// .then(([user,created])=>{
//     //secod, lets get a reference to a toy
//     db.pet.findOrCreate({
//         where: {PetName:'Verdi'}
//     })
//     .then(([pet,created])=>{
//         //finally associate the toy with the pet
//         user.addPet(pet)
//         .then(createdRelation=>{
//             console.log("createdRelation:", createdRelation)
//             console.log(`${pet.PetName} added to ${user.name}`)
//         })
//     })
// })




// GET /favorites - return a page with favorited animals
router.get('/', (req, res)=> {
    db.pet.findAll()
    .then(animal=>{
     res.render('favorites', {animal: animal})
    })
  });










  module.exports = router;