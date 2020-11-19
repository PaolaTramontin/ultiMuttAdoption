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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImQwZGYxNzRjZWE2ZWY4Mzk1Mjc5NDQ5OTkyYzFmYjA1NjJiYTYwYmM4ZWQ3Y2NmOWY2NWI1MjQ2OWI4NTYzZmViMDgxM2RmNzJkNzY0Yjg0IiwiaWF0IjoxNjA1ODAxMzM0LCJuYmYiOjE2MDU4MDEzMzQsImV4cCI6MTYwNTgwNDkzNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.jN-CunK-ajumKfzHjDQLFSpV4V0QjhWlQrPN2z5kTZSUpGprAtLPhG66M99HscKLsclZnhJJBoq2CKPxEBzNicfEFqYqQwrgot2VMJKJgQt2lobGeGEzI_PosgWONqJlqMh2qVQj075V5N3mcWi5LNwKqcd_uO3wbOqO8yQOZMeqvZiNBzrf-Y4GYKSuQLUXuuh6NJY-q9UJbF6BWI0sPo7TKF2WjjJs_axjdVwnJ99ddHeTuzk7ucaSO_Sxst9CqtmZbWXfAbj66esvxLz-gYs-pOaUSwaPoJe8J-PBoaMlAuhxioypsY7AIQ6DpeAVtWBAo9FxXu7XrjLXhJB8vA";

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