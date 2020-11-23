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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjJkMGJiYTI5NDFjZGU0NjBiNmJlZjFmZDgyYTZiMzI5Yjc4ZmM4NTYyMDBmNzZiMWI0MjRmY2ZjNTEyYjY5MTU5YzFjYTM5YWRmYzNhNmJiIiwiaWF0IjoxNjA2MTU4NDE4LCJuYmYiOjE2MDYxNTg0MTgsImV4cCI6MTYwNjE2MjAxOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.KpOQWlvsOZqpfyaM6IwlUpEPdYDAvp0O84QQ97ldXr0MbV7_BR_83W4utIAEt1XtxPyHcnvGuQDIyrd67wi9jUDHk4M7sSrv5jWSVm2R-QAhlUA7vL0m1sdvPKE-XrUlkENLTlZnXR97IbmqoIs_oEeQ7SHIuBZ4WfoanUw7swULPWPDl865qxKq3k1rfBk2VMnGAzOEWA9_ymBuNJC2nYX1z3I9M4pl33JJQgKdzE7mMqYwwEirMyoVDv6s06BYBgXULFov5D0P8rfvbvHJ41w4Q-jtHgjduyeMH5vr5xvMuBCdfH32KpMFT0gmB3MciW_ltcgYoB93vavCBOHVbw";

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