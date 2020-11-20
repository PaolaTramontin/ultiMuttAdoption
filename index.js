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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImRlNjVmMWNkMTdkOWYxNWM3MzhiZGQwNGNlYThjYjgwZjc1ZmRhM2FlZWRlNzEzODVjYzY5ZTFmNGRjMjFlOTYwNjA2MDNkZWYyZTU0MzFmIiwiaWF0IjoxNjA1OTA4MTQzLCJuYmYiOjE2MDU5MDgxNDMsImV4cCI6MTYwNTkxMTc0Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.nFbwTnU7hFUGfH3fYY_JQPypMEjhCUWP9iUPCRkig3qaUYPJBkQ-RQS6LFjfFFdtC0dNPU_iSS0Pq5rQe8WpjoAYs3QB59NhkJ6DkzonUTgeRKopa6zdWJcrfM5FG-A3jVaUfczekYIbVDLZA8E6jsk7kfWpY8zmw7v6kU38xfrfZAcbldv9ZTk44k7zl7vwOZbK2ZJmoCyXlm3nYJWTE2FG1YP7jOsMjjyYAvp6JtmTc7Z0CVg3IMwpcLpyRilpcawQtM1M4okNW3nGB_SJXwAzEJTvqmNY7L8WFSDsi99Kf74v34Y2Ir8gVsyIXgdL-08JDuruW60UAgxt_nzaKg";

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