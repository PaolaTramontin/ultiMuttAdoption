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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjZhMDEyYjlkZmU1NDk0MTk5ODhhZDliYTkzYmRiZmFmOWY3Mjg3MTFmYzdlYWE4YWY3MjgxNDZhMjE4NTVlN2FlMzY2YTIzZDhhZGU3NWVmIiwiaWF0IjoxNjA1ODA0OTU4LCJuYmYiOjE2MDU4MDQ5NTgsImV4cCI6MTYwNTgwODU1OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.vu3XIlc3sm9PXopODjevObcMTC9dqcajr3_MCGXhYTBuizyW26W3AdW0dkCEoq1eHEBrDv9oyE8fG_53AUmzZ62Cx6cZOQbYtipe7Rq0XgwHu-9Rt0nZyC5s6gl2apbW62BxOe_UJYW3QzlI_ia317e3T0agtCGgjEGrlgSWy1EbMo61OUNNm-ayUCshEXexyn-Oo3Txkad5mz3YHOTGeUxPlNFlsQTHx62fZ6sud1qt_mnRY6I4MZ-DthtlR4GWsM60rOMgPHq9kx1v0Zv4ZknxPx1w1z4aa7wsW6scP9CmXESA6IWWGXLkeWu231wEYdEnpSovDj2FKbMyUg6Qdg";

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