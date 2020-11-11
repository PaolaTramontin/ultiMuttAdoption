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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjAyNmU1N2U1MWUxNmEyNzczZWRkMmRlNjIwYjNjOTQ1ZmU1MmNmODg2MmMwZDYxY2RlMGE5ZDRkMmE5NmFiZDc1YTExOGM2OTU1YzUxZmYzIiwiaWF0IjoxNjA1MDUzNzg5LCJuYmYiOjE2MDUwNTM3ODksImV4cCI6MTYwNTA1NzM4OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Nm6z5nzjdlwbl7QjsgzHDSgLDMVTHk94XgnK6OP8c6CD2y6IYdeJdH5qP_52v8TN-HNdlasoiP1fm1Rx05o1ikaoqRiBBTsdf7QWwq-VCrgKP5-ri3wvfgr1jGgyLXzi4RaFub5_c5SKYBt5xrXZMm-eIW1PSUkt54PFcwYXqXRrao0BQjvPnfjbebb_tg6-tmwTtIhH8L3FAg3RVZEpxb7pGDwpCOdFjEpq8V1cCZ7tPHVpQ3o5XJqTw4RDP8-RrFwDd68CVj7AyNv2DgLXDttAeeV_RWz6NUSMPrKiVCMtPcnuB1pbNs2whZpHpAsoigliHVe1OY-EmC--quSlgQ"

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