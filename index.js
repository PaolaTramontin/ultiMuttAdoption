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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6Ijc5NjIxMGUwMDEwYTQ5OGFhOTc5MDczMWM2NjkzNDU2OTE5ZThlMWU0MWRjYjY2Njc1NTFmOTcyZDM0NTdhODRjMDk2NDY3N2EwODQzZWNjIiwiaWF0IjoxNjA2NTgzNTk5LCJuYmYiOjE2MDY1ODM1OTksImV4cCI6MTYwNjU4NzE5OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.OB778Xkm2vCCwDHEiBHrgkf0sLOVak5vj5NdYpvCyrpJjOEL-hby4F77BEyyNmBFoJvaqgpcidvqjPFjLnH3T0kZ4NKhReeXagDUsV7toNt13o_6hHr6HSCDvSEvCM6dib2kIqEdQiqoVi9tat4ajQtFuxGoAcfqsG2nL4FYu1Fa-Jy921DUhpNBTDTBODsBmlCjHIYDBb_G2bZPqW5y0SWiz1znRSr-cSvXKsxQlblijA6SUAMs55_3WHHFq0k-sSVyylWOg4N_0EeE7797VefisRQovBMGZfupZA-6CwCSbmMUlAjFKgDx3fIGvqffurcNKALLRu6CYweIb9rpKw";


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