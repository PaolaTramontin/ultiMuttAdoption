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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjEwYTc5NjFiY2IxMzVlOWRjZjVjMmM1OTA5NmMxNmI3MWEyNWM3N2M0YmZiZWY5OTU5NjU3ZGY1ZjlhMDA4Nzk1MDE4YzA4NWE5ZDE0ZjRkIiwiaWF0IjoxNjA2MzQ2NDYzLCJuYmYiOjE2MDYzNDY0NjMsImV4cCI6MTYwNjM1MDA2Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.knqkotjvUx2Rr-FoLOe9BLwEfkLFH8_WZczvIWgxkyUzNQmlETwRGwtRCkqhNPbBsbZLMJGyMks_p9QwDj-379cRoTupn7qsftIQVky9LX8xk7h1AMKEWG5M_Whs7Hd3TT1Gs1V9PshYJ0uv02SaV68iHvJo7PVG_SraU16rKRavBhourHFRtw5ub-28_bt7OO_TYIL280ArmKPsVZTs4RRp-JIhlnECmvHiayy7TL0bKoLtYHZ16-hf_VRShygJ6mYFML1H3hdDCGdlSYJy8MBacoPG-Fmhr-JxiM87BE5kl0V3x3-2LdNyW4ZjX_13OAmo_sqEG1hizVDEIPUBzA";

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
app.use('/zip',isLoggedIn, require('./controllers/zip'))


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