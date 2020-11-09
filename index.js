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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImFhZDVkNzgwMjRhMzYyOGRjMDMwZGY0MDZkN2M5MWZiNWJjYjVkMTkyMjM5Y2FkMTg5MjJhNWM4OThiNDlhYmE0OWFlYThiOGU3MzdlZGQ2IiwiaWF0IjoxNjA0OTQ1MzU5LCJuYmYiOjE2MDQ5NDUzNTksImV4cCI6MTYwNDk0ODk1OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Nb7kMPMxRSK0MNwlIjT8t0gH8SjzPG6_VNSTcIrxcFz7hXgeKabnmnNGr9TTaybEZWx5jZa4PmcmEjHi4SS47QLq1btznf_ShovKy508S6ipoXCSDZXOrWB6zOGxVzgVgVH7KUxQeLEYBLJ-oAYPqRIPsjKyiberawx9Kb82veOBsJvRahNUtE9rsG0PAexZHLiaxVihvw37MJlugDGTFeiyeDH9LSii30XRzSeQpJuc4mg0weZxPWyPIYRviCK46TwOEbwryvnFbQy94RnHRQPDVQgFW3hjUnjLNqPsIE3dPjdX0YNEgFoHnqw1w_Tv2jlUr59fEGNDZWWT8dEgxg"

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







app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})


app.listen(process.env.PORT, ()=>{
    console.log('you\'re listening to the spooky sounds of port 8000')
})