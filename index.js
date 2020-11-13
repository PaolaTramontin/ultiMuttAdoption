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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImY1OTA4MTIyYjM1MTVlODE2YmQxN2JiOWI4ZTA2MzJmZWU4YjQ4NTVkNDJlODdiZGVlYzc5NGM1NGYzZDcxYjQ3NDBmYzU0ZjVkZTdlMGViIiwiaWF0IjoxNjA1MjkzOTk5LCJuYmYiOjE2MDUyOTM5OTksImV4cCI6MTYwNTI5NzU5OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.QUJexrwKOuxzm5f_wkgRL0rVjDNW09f9VMcnGWCnDudGx1jpZoM_GtLgCu1ponNGhYnXjieXnJNI_3EO639jCKumkOm7asCCSl_16nfqAzOuay_r6H-0ABIFum8ioHwL1u_8jZ8JMGaCAqY9oV1BzoHDzq2Kc3bvYMQS4GGYNlXRUfAr-9Ec5x4shncrGuYo-l2jUK1S7Xp-BxU1qh_KQXtjkPUbfascTBHsIB7ZVK4UkjxispkSGMRFpekgUNKWev7vnRj8In-4p7ZL4gf3M-rLeN8FxLvrfVWDw7tBNcxcoFUUt1pqjZu-vz9LglCH0F3isGdqS_LsFw7i38QcSg"

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
app.use('/animals', require('./controllers/animals'));
app.use('/favorites', require('./controllers/favorites'));
app.use('/comments', require('./controllers/comments'))


//CSS middleware:
app.use(express.static(__dirname + '/public'));




app.get('/', (req, res)=>{
    res.render('home')
})


app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})


app.listen(process.env.PORT, ()=>{
    console.log('you\'re listening to the spooky sounds of port 8000')
})