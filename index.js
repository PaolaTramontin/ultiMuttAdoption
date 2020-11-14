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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImVjNzExMTI5YTU1OTE3MzFmZjdkYmI3ZGYyNTE4MDkyNTlmMDVkODk2M2ZkMTk4NzMwM2U1OTYyNjBhNGZiZGI4NmY0NmVjMzM3M2U5OTQ2IiwiaWF0IjoxNjA1MzE4MzIxLCJuYmYiOjE2MDUzMTgzMjEsImV4cCI6MTYwNTMyMTkyMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Ui2HyvM2nFjWuZ5wHE-61-aX2duWD6CxMJ1LH0W0tz-oTG-7gNkXASESHrfU9maYMfdgfuMvnU1hJKiJCGPjR74vMKUWG8iv66wH06lF85bSSAYI1EBbYntBI1ZkyDMxfe2S6k9X3L7ogW42gsAHTZ_37NfpvrXo_KIJ2XADEzfkhbaOjAUMIArREqrYZQpvdidItXldTXSoplwFt8-LouQhR2EYhI72g9QgiPkpdj8i22El7Y5wen5BaF1IfMRmy9N8JDxgaJCm-9xS8jSgPrAxbjUriJfw4hq38SH3dsx60hgfHg1ZIXf-5fDJXOEy4gLRx1fFJGPYFnF40L_BqA"

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