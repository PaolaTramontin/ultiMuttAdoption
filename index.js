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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjBlZWY3NmJlOTgxMGQyYjAzNWNlODBjYjRkY2IzNjZkOGU5YzM3YjQ1ODlkMzg5MWUzNzRkYTRmMWE3MWNkODcwY2E3YTNjZDA3NjQxNWJhIiwiaWF0IjoxNjA1MjAzMTY3LCJuYmYiOjE2MDUyMDMxNjcsImV4cCI6MTYwNTIwNjc2Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.F6d3kSSNUS5d2foHx_jCKl2f7jmtmi9GEo9fEqdU8d8kE9-AMzqAsYK5n4En2p4R-8HuDSDwG5fZhlwB8uphKCPJyZwQK8NH3bmvYeklr_utFtAMsMpm-BArT8yhgk7-KW7q4lf1CrfOVRrEnXyLn5613Vj12x-xPo9Ii622xKwD3WEwxykyLCMTg1rhvKqdiS0TKEi9_ysRruaSnEvvJAp3Ie1XAlvWgQziQz-LHSsEFrjGU1FC5Ci8K4pgxyMUhbwYBxmGf-gLF3TMhxTDyuYTmCLcu0FXQNrbeGiPl8-0RJQrX645gxZfCa4Q6Tv5-XcoWP50rU_1SXJhHK0D8Q"

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