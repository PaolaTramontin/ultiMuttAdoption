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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjFlMTQ3ZDUyZjU3NDIyN2Y2YTVmYTUyZjFjMzIzODQ5MWQ1NDFkZDQyZjc5ZmY3ZTM2NzZlZDU4Zjc3ODIyMmY1NWM3MWJkMWViNDcyMzY1IiwiaWF0IjoxNjA2MzM4ODg3LCJuYmYiOjE2MDYzMzg4ODcsImV4cCI6MTYwNjM0MjQ4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.Dk8d_SQpMW19w-r-9xq-_OT2gx3u733U_sdiQzE1HWgXg-D2xU2hS48SXc4R7kZCbi68-enAKMU2kSo_0oeNpUokFCLP1nVsx0hZf5y4Vz9e6ex7kWtlDpXPmcvUYoZbl3U6tVAXjPSnGNPfLjJ1rq7OrF4PKL1Bt-S-3ydK64OiLCF43Wt8Z8I3399yJj3SoiyRWBiNg-ejABZAn17PwIen6Z8Fl3btprP00rYZsdCYEWYipsultTKKDmUXkesJqv4CMp3RSY1niUiRGNttgnWxL_p8fL1j9jZxFbWsCcJzWPLSG1wgRkBtJb3gaEZHmpDjfOkrtqhgyQiXOGg59g";

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