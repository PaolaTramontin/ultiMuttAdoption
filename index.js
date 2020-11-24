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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjM0MTEyODNkODgwYjM4NzA0NzNmNjE0ZTNlZjgzYjMxMDVmNTc5YjBmYzhhYjhlNWZjN2M1ZDRlNjBiOTUxZWZhYmNhM2JkOTcxYjU3YmY3IiwiaWF0IjoxNjA2MTk0NjE1LCJuYmYiOjE2MDYxOTQ2MTUsImV4cCI6MTYwNjE5ODIxNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.H_5Mpo-Z7fJFCVftDyUJczW_hW7ebs7v7O5sbWEYkBnaofWEjgG6-goGLzHXrc6CNV-7HYtfbUmZhXxHPEnhhlo184Ep4iQf4batgj53UEaseO-5lP9uD6V-LJG2mvaESeXtVDN2NImeVshQ0StpMfmM8AhJ-_llqLW8G7L3bN6etdtJBNf-NlMTSaiU3hW8bvUQ4Wex7T1snzMuOzBc1z4e0c7E1N_dzGmo4GjskEvECx6f7Eb91u5EojbEPB7788S4Uy6yUY6X8KEoFQ1fqGIR3JXyKDFf8qLFjUOT5SpuVxQwXHRj5aSF8nVnT_t4QQhBkKQzJHsTZTdSU6Qbpg";

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