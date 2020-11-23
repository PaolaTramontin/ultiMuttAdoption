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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6Ijc2M2Q4NDA1MDY0ZmZlNmU5MWY1MmZiNTA5YWQ5YWU4NWE1MmRkZmFhYmE4MDhiNjFjNTI3ZjZlNTUwNDBhZTI0ZGUxM2U0ZDVhNGJlMTEzIiwiaWF0IjoxNjA2MTYwNTY3LCJuYmYiOjE2MDYxNjA1NjcsImV4cCI6MTYwNjE2NDE2Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.DIvklvK7PGL6ctZuuyvj8nYVESRVrdoHN6N4_x5dPKO9N0KMKdc8-IfMvNr0AkH5mOGEDRaZDZwRjKSkWkv4XDK-nUZpeV0p3La5Kf_vD6w4qumn2LdFzvUnS0KuU-xFTnqanCwsZi34qfbVXrvtRXSDUXa-t-M0lw1c6kNVoWw-CuHz7Jw3oPYlhr-PPLELxra2iK8B6QxzAwecN9apBni4Vk8uOT7FTk2oBEXePKKTDAeXfZtwxk4gqsdMvUE_dmMDmD7stMg0JpIKHhHxfVATkC_rWTThE87Hc0MaOgo15MCE7u6cWXHxea5IiaInbi67tvP7pedkVFZFX1PKcQ";

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