const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 




//SHOW ME ALL THE COMMENTS ABOUT THAT PET
router.get('/', (req, res)=> {
    db.userpet.findOne({
      where: {id: req.user.id},
    })
    .then(foundComment=>{
        console.log('THIS IS THE COMMENT', foundComment.dataValues.comment)
        res.render('comments', {commentList: foundComment.dataValues})
    })
  });
  








  module.exports = router;