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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImM1OGJlNzA0ZjhhMDk0YzA0MmFiMGUyNmNlNDZkY2FiOGIxYWNiODcxM2YwNTkwNDA4NjIzMDA3MDY2MzkxMjY0Y2MyNDgyNWQyYWM3OTU4IiwiaWF0IjoxNjA1OTA0NDk3LCJuYmYiOjE2MDU5MDQ0OTcsImV4cCI6MTYwNTkwODA5Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.x_w8DNWiPtvtEiYmyNZaFUMXhYyXtVm0Gy5dmGteiAn_xp6lUVBgvHSWlBkmk8zdHV1n_mmpBWFBGDVHsjzcR65CrEBY57tQfidPQEU3N0rl3eiTWpkdiVT-3P5bg4pN6c3q6AaW5pMPE0Q28oo8T_GIjl6XtNpyJ1mR4WegO73HrfyaQR9CxHCwokmfuvb867dEC1563KaSYR45yCkIlvvDWipP7sMFLymN4FxVEXGcrdH2osXRRi53xwAlSNDWSGBAXiB3DWgjs4FT_y_092UA7wMVO8aY392L6tpJHIM8W8lHBSiEJMYkeyHPwDpEhqVdKXUG1Bup39x3T8D5CQ";

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