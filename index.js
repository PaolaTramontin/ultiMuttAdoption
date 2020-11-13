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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjY2ODEwZmQ0NTkxZGY3NzIyOWIxNGM4ZmUwMjdjZWIyYjNkZDI3NmM0M2IwYTg2OTZkMDRjOTVkMWIzMjhjZmJmZjk2MjUxNDc3MTU3ODZkIiwiaWF0IjoxNjA1Mjg3ODAwLCJuYmYiOjE2MDUyODc4MDAsImV4cCI6MTYwNTI5MTM5OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.HpsnBJ-6VmHYk6_EllwjdusfihClUB3pTaO2qGFvoJ2ONFi8JC64uSEPVRrW_NepsJVmgxYc6GB2EP_Wr5L9D7qbAv3lj_BDen8USMZbbF4l78D64dmUvqa8lb5R855_R4QruGJsGF6ja_YJjPSf6OW9-A6ANDw9JcFFLavLfNMK1Mhy-NcfahQZ_z5Kzxu6m6z3tcMSmMMEinRZUXVjTIVGSvW03MKUpVcQGuRJQ-do4t447us-47ZtKwYc_f9RudXVATKW7w_X63wyUBwzNcyg1720mvpZR9EELa5WwEF9LDfvJSk47eMRrbAs2Y__EmzXx0h_VE8WL-F4GcbIjg"

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