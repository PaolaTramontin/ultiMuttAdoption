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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImNjZDc1NWExOGYxMWEzMGU3ZDBmNTcwZjM0MmY2MjQxYjAxNGFjM2YxODVmYTM4MzgxNzBmMjQ1OGQwOTg0NWE1OWQ1ODJhMmE0YjAwMDEyIiwiaWF0IjoxNjA2MzIxNzkzLCJuYmYiOjE2MDYzMjE3OTMsImV4cCI6MTYwNjMyNTM5Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.rVsNerl2YSAzPURwvS3g2rjZenBMaW538E4WZDOUDptzbDLWPLLRaAZdWtl-YtrFGkDDlZHtfMA2hN1ixMGjo5S4AL6VZz32THEf6CpmARLVcnuW6xQAq_av5zDt8EAJfAgBNDH9d-iizJugtfyRfIdFlwaQxP7kwWYiPEnmy3v5R19MiImVM7t9vKjXdtsk5k1VbZZgqjcnOhxPQMSz4VRWBh5fNffca1MuiYUt5O9esEkm3Dc53C0IomLyyhLh2P4RZ-rasaziiJplyc27x4CVX5IU3ZzW3oqZgJwNiExnX7OFmrHK_wetBjQfd878CJ_wohB9F2NdAZwVGclK0g";

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