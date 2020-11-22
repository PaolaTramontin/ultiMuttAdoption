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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjkzZGQwNjJhYTQ3YmZiNTg0MDZkZWQ0NWE0MjZiY2E3Y2U0YWQwMTg0Nzc2NmEyOTQ1ZThlMmY3NTgyYjNiZTdiYzAwYWI1NDQxYTlkMTAwIiwiaWF0IjoxNjA2MDA3MzMxLCJuYmYiOjE2MDYwMDczMzEsImV4cCI6MTYwNjAxMDkzMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.GsGX6wnAY3n3Wg_Ub3cEDZPN0jmLOA2IaZxF-jtEmyWO8oNvAhyeHdeX3kuljcI3Htr2ikJrU0uS1F7k8DEVHj6wBhMA12nRVZFkMjnPkLhNcnYxJciXW5YQtGNEPbIOPrsC-8Q12Sx2zQP3ZUt-2t4LNX8NSC0o2Gb2dJZMdL060qElUx5gJJ2YC0gv5VEr9VqwYEPOknq0iQGtBHS6jHtK6Pa7u7tPbvCtxvgIfdaqFfUT2HY-VMoPvqJ4t-35499ypO0i9pXM2aWRmDFkjM3dOKsWMl694PXJLUmLFJ9XzVnfxy2aby_ICvBYwCBuwOJKUSQON06PX1FU2Av82w";

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