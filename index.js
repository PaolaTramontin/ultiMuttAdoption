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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImZiMzBjN2VkZGUwNTc4MTM2YzIzYzc2MDM4MTliYWQyYjA2M2JlNGNlOThkNzViZTVlMGU5MmYxMDIyNzYwNzJlZjI2NzI2NWE3M2E0ZTE5IiwiaWF0IjoxNjA2MTY0MjQ0LCJuYmYiOjE2MDYxNjQyNDQsImV4cCI6MTYwNjE2Nzg0NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.Y6lRaZ9j-K54mNtlKF7GR3sBYCQ5ddUViqYzXLUg58h677JgiBk6eEyPVZgLwkkhxL0A4GIZ3e5wJrBl67NkPhC4vUxHG0NdI-UHrvbs4fZ0gCD7zlbJK5wF_6Sm9Fcx6a-TEOLidY1frIqr7nxiDVVHqdsTBlWDqekbonpLL8h2DooudtsFrdnlgxmJrAx-FIepkB_rEWT2LSbpSIRRGs8T6WBW49oCl_bJiTWpxnAmB0AolI_bhcKyLoA_dterVX1AXLOnMRWggmFaA8mOI2hG5jhnqRTKmT3XWPEZ-XV9OrMNHArDMF_pWKHIrIxRdsjXtqdlt1BQlSIrguhGXA";

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