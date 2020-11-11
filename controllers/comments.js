const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 




//SHOW ME ALL THE COMMENTS ABOUT THAT PET
router.get('/:petId', (req, res)=> {
    db.userpet.findOne({
      where: {userId: req.user.id, petId:req.params.petId},
    })
    .then(foundComment=>{
        console.log('THIS IS THE COMMENT', foundComment) //this returned an object
        res.render('comments', {comment: foundComment.dataValues})
    })
  });
  








  module.exports = router;