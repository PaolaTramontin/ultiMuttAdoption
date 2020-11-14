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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6Ijk0ZjQ5ZmEyMGM0ODUyODBlNDQ0YTc3MzU5ODMxYWEwNDcxNDYzMTQ1ZTFmM2NiYWQ4MWMzZTJkMTQ5ZmM3OWM1NGVhYjQxNWMwZDQwYTg4IiwiaWF0IjoxNjA1MzEzMDY0LCJuYmYiOjE2MDUzMTMwNjQsImV4cCI6MTYwNTMxNjY2NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.L_8hA1iyBFCkibE0wuBYyceSPGVfEd5b56dT22t_CdntaZVMk-Z5UMAin-kDwbTEwufcAih14ksO9FiB77C9QPvi_Od9BivJaunO44iT4HTI_emu22MPj5DWhp-CtPtA4aVXguOdrLVpS-HK2Hn6RREIPdSqz4-khWhCyvKXC6iP_My2Ad6GEk0g3ZlxvTHyELgYfaIpp3xHIH0u2cjUI_gmHagJYMMxYQwUINHfzKTdKb7v5Gqofq7p-BdsQQ3w5uJOGLXZdTHuAwm9alXHOlymfot_PIEWQ7DBLH84cpj9NhUvvhoTn9rHf041H-q1uAlGr9rYsGZWJrE1Cw9o4A"

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