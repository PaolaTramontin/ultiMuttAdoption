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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjZlNjk4ZDRiZjI1MWEyNDVjZWIzZDMxODQzMmUxN2ZjNjY2ZmUzZDExMTQ5YTA0MmY3YzExODQyMDFmM2VlZWYyZTk5NDlmNGVkMzZiMDgxIiwiaWF0IjoxNjA1MTE1OTg3LCJuYmYiOjE2MDUxMTU5ODcsImV4cCI6MTYwNTExOTU4Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.P1K14E2CcHSJZOaQKfRnj8mo5hucgM3lZnO0-ThthnLOTqzam6US_367UO1XhpLZxklunrx4bVA0l-sGeuyF2o4OhO57OE8q4NY2FT7rb5kVGioeAfvPVgpxPIFIPwa0SbWJWT2A587c-I2N53baAf6kzNwuVPlZnRqKXBR5yeBr5voAqJZn0_2dLfsYfRqMKgc8bI-onwB2WaelIBgFLedL6056dfRqOGclptkonTb1QfN_r2o7LMsEzL6OhGFV4uPmmZubvLCpycAP-EbqhPOk2sKYV6jWc8A4c_ZWxPia3Ozw4-ZBEaDzmeGsDe9krSWPAPtovshc3A7VKwFSxg"

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