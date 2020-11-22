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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjMyYzM1ODYxNWY2MDE1MzQzZjA4NTIzMDNkMzQwNDAwMjVjNmNhZjNmZTBiNjQyMTgwMGQ2ODNiMDJlNmRhOWM1ZjU5YTk3MmYwNGRhYzQyIiwiaWF0IjoxNjA2MDE2MzYxLCJuYmYiOjE2MDYwMTYzNjEsImV4cCI6MTYwNjAxOTk2MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.hOponHCoZ9xBTDqcyBdBkIEPhpVFlzPdApRKDCSVF6Zy7NWNfpgj3SiZFDfbknbFcWDvTW5gVTcC6uwoFlhh5L2Fh9Y_FcoveA14OS4HOMW-CYHucbWZzY1bd0rAv1fJIKYHbJkQ8QQTv1e9aeTXd51QQcfq5rMafXisKpA6fvtD69MuTcVCXHd68zqgBGe3YcJ3B7m2b3SKF5x0J5Q7jEpxtyV5lC1p2wJAsIT_lCuIfsQ2DwAVYo4zmCRWyIAXe_bZUGcD5_OArVbyBZA1qKL5SFGhNoEHqP92X2zbOj4Qc-4J4T4gA25PLX1hp8JxKnjc-wI9MtFx0lJX9YzR_g";

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