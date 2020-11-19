require('dotenv').config();
const express = require('express')
const axios = require('axios'); 
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const methodOverride = require('method-override')
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImFkYTBlZDk5NzNlMGEwZGU3ZDdiMzdkNmM1N2E2M2NmZTQ0NDg0MTM0YTQ5YWZjNzE5YmMxYWM3OTg3YTA4OGUzOWVjNzYxNTdiOGRkMzhhIiwiaWF0IjoxNjA1NzQ3NzE2LCJuYmYiOjE2MDU3NDc3MTYsImV4cCI6MTYwNTc1MTMxNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.kC-CpYTBqJF2lrkK5hAd_4elPjJKwKbfS9vWX4zsU9B8E7Ad9QtKeHx3Yk04Sp7D2tBc_cOscGHlT3HvlrK5QqmmRbADfcjb4q2xRhHldUCGDirogVX34VLc67kBUoQmDHF9FO9_syu5QSjPzRiL3ivPGWqQHGC0Nl1cdxgydJKRztB3b4r7sS83oR005YbX-IeUAF8cmiuDjbLlE0DjuaPMRrsHuS85gK4Yj-CeqOmL3_ABJMRul7pLHBID_lXLLp1R1UbZPhtnFntqG6YwsUp1gBhBQ6DKIFWYXwOZliuouhkezSm4jopfXEzG6dmzFPDmR4M9vvi3rYZL_XVwzg";

//setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts) 

//setup css
app.use(express.static(__dirname + '/public'));


//setup method override:
app.use(methodOverride('_method'))

//middleweare to make req.body work. ALWAYS put it above the controller middlewear
app.use(express.urlencoded({extended: false}))


//sessions middleware:
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


//passport middleware
app.use(passport.initialize())
app.use(passport.session())


//flash midddleware
app.use(flash())

//CUSTOM Middleware
app.use((req, res, next)=>{
    // before every route, attach the flash messages and current user  to res.locals
    //this will give us access to these values  in our ejs pages 
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() // move on to the next piece of middleware
})


//controllers middleware. This is what allows us to use the controllers routes
app.use('/auth', require('./controllers/auth.js'))
app.use('/animals', isLoggedIn, require('./controllers/animals'));
app.use('/favorites',isLoggedIn, require('./controllers/favorites'));
app.use('/comments',isLoggedIn, require('./controllers/comments'))



//CSS middleware:
app.use(express.static(__dirname + '/public'));




app.get('/', (req, res)=>{
    res.render('home')
})


app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})


app.listen(process.env.PORT || 8000, ()=>{
    console.log('you\'re listening to the spooky sounds of port 8000')
})