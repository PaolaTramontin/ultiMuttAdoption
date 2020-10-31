const express = require('express')
const router = express.Router()
const db = require('../models') //go back 2 levels to my root folder an then find models


//remove the / from any ejs file when you render




//this will send us to the signup.ejs  .. which has the form.
router.get('/signup', (req, res)=>{
    res.render('auth/signup')
})


//this will take the stored infro from the form and will store it in req.body and then redirect
router.post('/signup', (req, res)=>{
    console.log('sign up form user input:', req.body)
    //if it does, throw an error message
    //otherwise create a new user and store them into the db
    db.user.findOrCreate({        //if the email doesnt match then, they prb dont have an acct so the default will create a new one
        where: {email: req.body.email},
        defaults: {name: req.body.name, password: req.body.password}
    }) //create new user if email wasnt found
    .then(([createdUser, wasCreated])=>{
        if(wasCreated){
            console.log('Just created the following user:', createdUser)
        } else {
            console.log('An account associated with that email already exists! TRY LOGGING IN AGAIN ')
        }
        res.redirect('/auth/login')
    })
    .catch(err=>{
        console.log('did not post to database. See error', err)
    })
})



router.get('/login', (req, res)=>{
    res.render('auth/login')
})


router.post('/login', (req, res)=>{
    console.log('trying ti log in with this input:', req.body)
    res.redirect('/')
})



module.exports = router;