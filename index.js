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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImFkMTdjYzZiMWUyY2Q5NTBhMzI1OTI5ZWMzZDg5YmE4YmVkYjdkMjQ5ZWE4ZmUzNjE1ZDM3ZjIxOGIyMDQ5ZDNjNWI5MTVhOWI1NzRjNjk1IiwiaWF0IjoxNjA1NzQyNTkzLCJuYmYiOjE2MDU3NDI1OTMsImV4cCI6MTYwNTc0NjE5Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.SHD-GBSoaMaMQohkvLtHClOeyxNUnRoTgoGpCnElM9IV1FeY_HAu-ENA1ZSEtC7KIchBXg3xWwMCBCNT1xUj_MsRSl7WFDYv8ST0gxe4nDExU62dRj-vyMANjSxne9YSiRo53mYTgxbRrdnFBo6OXuFEE3uirRFKpjvSYCujx3HN0IH0W9IXsijmheWlfM3T98Ld7SC6fP09lVOS6FCVvBw1OrrqVkFKqRB_fdFyrExror7TKXFdmBBfCMwBRXu0Q-CC15UhOD5u2dMzopM9vGLxyIACR4SC_QWWreBZkUisJwDbuw7slPNIEH4NADAXkC5NqgTEEcmSzSN_y1AgXA";

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