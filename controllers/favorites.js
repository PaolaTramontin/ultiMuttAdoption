const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 




// POST /favorites - receive the info of an animal and add it to the database
router.post('/', (req, res)=>{
    db.pet.findOrCreate({
      where: {PetName: req.body.name, ReferenceId: req.body.id, Contact: req.body.contact, Status: req.body.status, Description: req.body.description, Location: req.body.location, Photo: req.body.photo || ''},
      include: [db.user],
    })
    .then(([foundOrCreatedPet, created])=>{
      // console.log('found or created user:', foundOrCreatedPet)
      // console.log('already excited in db?', !created)
      // console.log(req.user)
      foundOrCreatedPet.addUser(req.user)
    .then(createdRelation=>{
      // console.log("createdRelation:", createdRelation)
      // console.log(`${req.user} added to ${foundOrCreatedPet.PetName}`)
      res.redirect('/favorites')
    })
    })
})



//GET /favorites - return a page with favorited animals
router.get('/', (req, res)=> {
  db.user.findOne({
    where: {id: req.user.id},
    include:[db.pet]
  })
  .then(foundUser=>{
   // console.log(foundUser.pets)
   res.render('favorites', {favAnimalList: foundUser.pets})
  })
});


//DELETE A PET FROM MY PET (FAVORITES)
router.delete('/:id', (req, res)=>{  
  db.pet.destroy({
    where: {id: req.params.id}
  })
    .then(numRowsDeleted=>{
       console.log(numRowsDeleted)
        res.redirect('/favorites')  
  }).catch(err=>{
    res.send(err)
  })
})



//EDIT COMMENT ROUTE
router.put('/:id', (req, res)=> {
  // console.log('@@@@@@@', req.params)
  // console.log('@@@@@@@', req.user.id)
  db.userpet.update(
    {comment: req.body.comment},
    {where: {userId: req.user.id, petId:req.params.id }
  }).then(newComment=>{
    console.log("this is my comment", newComment)
    res.redirect(`/comments/${req.params.id}`)
  })
})


























  module.exports = router;