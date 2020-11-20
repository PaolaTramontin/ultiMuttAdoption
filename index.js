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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjNmYzEyZDZmNDFmMjFkNzc1N2RkMmJmNmUyODQ1M2U0YTJlNjBkODJiZTYyYTA4OWRlNTA4NDU5NWNmYTQ3MDc2ODg5MTZhNmIxYjBhZDJhIiwiaWF0IjoxNjA1ODM0MDcyLCJuYmYiOjE2MDU4MzQwNzIsImV4cCI6MTYwNTgzNzY3Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.d-eZw2kVrnHsDPLfu2xytEJxp9hN-lReScxgoSwiEVfHOIX3nMPDVrDl7DqSlPQw7T7-Vjs9c-WuiLAObDilPR_r53raDaz5lYD_y1TyT3Eg7oHK7eVVZSNyBrXaCnYkLKjxwDa2qY7tvji1vH53MiXWwJnPnV1_eldWj8py691MjrXSdc6ojkQVjzVupiOWKvJduaMpJ8Og9eMTUmI0MNx3LcVmp0qj0D6mwx1aPClmlqltfbo16aS1lY97Xt-c4dxS6TvqsiDtmmHv2g8X0hgFloc4dl2rZiEFRumINUYLW1KPBQLrQnnMzZQFhJ5B7lF8kTHTE07Q-HMitGMMnA";

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
app.use('/cats',isLoggedIn, require('./controllers/cats'))


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