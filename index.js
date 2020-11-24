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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImU5OTJkYTkxYWE1NmY0YjM3OTU5OTgyZmE0OTRjZTUyNjczZTcxNTkxZjZhZjMzYjc5NzhjYWVlZDM3ZmVjYmE3MGFmMzA3MDdiOTBmNDJmIiwiaWF0IjoxNjA2MTkwODAzLCJuYmYiOjE2MDYxOTA4MDMsImV4cCI6MTYwNjE5NDQwMywic3ViIjoiIiwic2NvcGVzIjpbXX0.qU-bgd3cFZUnOwXlJ4MkvL5d2T2t5UvFtD0hi1BYwYjxJGl0p7YbMRm7hfmMQ48qGCLwkqZ1Tigp1cnLuxsR5GsDOoJ_6iVWXXKaDopLYjpHdhC2NpVL04pYmaH2tQkssUK0n_o8DGQCJS58YfmwtvJHWq4un4I1L2nLUSF4vkN7OU23cnRpl6Mt6alVIQ-hgS4-lLkluRZXb8127TC2tKsYctfclaML-NVUYIUMAIcUASm-Zyxz0IURBloIJ60jhXMMSbGT8sBd2E1DhwrpqKMCek_tOu-h8aPDBcWu2zfbp0CfVIvywXGrnjT4eGpNxIQpHOLLwSQFoFaVuQYlUg";

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