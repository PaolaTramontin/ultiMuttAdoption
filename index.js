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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjY2MWI0ZmYwYTM2Yjc2NDdkM2UwNjFiOTJiZWZlNDViNzA3NzQ3YzQ5NmQ3OWJlZThkOTEyZjU3NjdlN2VkMzQ1ODQ4NTZkZWU0YzI3NjE1IiwiaWF0IjoxNjA0OTc0MDM4LCJuYmYiOjE2MDQ5NzQwMzgsImV4cCI6MTYwNDk3NzYzOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.ddeM3Tl67isFxrEba6yIy-Kdx5QyFsrOH8qYiO80SL2giJFdRSCxvbY72VLlIK_YLnpsq62B4wak5JoB70cAghM8cTHYVlzehxo9BSYh9vGvq5OOL_-YcILcPhVJIFbTvTljiyHinPnGE9CRQyzlJfidoUmXxJEfDTS3MNnFsJoFw7AZJ2w3rce2J5a00DYF-76hQBBUkeV58RnqWlqxp1LUVQ1jbmtSVRVbzYdO4AZ2GAQHjSnjOBtArPmMB6C6_PLs_dZMzDlHcNke6rXgUVJowZaaSRKF0LUDssrPJ4DGyqoocMhwmzqvdLaxYrd4_midBhxye_ToHHawNg-9jQ"

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