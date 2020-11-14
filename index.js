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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjRlNjlhZDFkMGU4NmMyOTU0YWM3NzMxYjFlNDAyM2NjMzZiNmJmMWQyZjQ1MGE4NWZmN2NkYmQ3YjhhZjU3NTU0Y2RmNmQyMTQ5MDU1YmJlIiwiaWF0IjoxNjA1MzY1NTQwLCJuYmYiOjE2MDUzNjU1NDAsImV4cCI6MTYwNTM2OTE0MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.JXaJxSJvDkmbPYh6hu_K_kvTENyO06kCSV-hzyatVnCVfPLnqILN6RLyjSgxF_1l7bpeCs7EZN0jXLLiKUv4wJlbJmARnX4RZPWPojbnBlIET2HERE5gcmYOoebz6A0eyEwd0YUA5ht6gUzdKWhVu3ndHTo6p_vWdu26eNPawXCAfyrMtiewEinswVO9VMIBzXOLa8uvl20gNPHHxijjVHbeOj-FDnluW3_jFImJNv8b6JnxTc2AhYnodX7h75XELuDhv9p42Gi_LnKq4NpmmDURiMJVvk8w5rOdREdUi-e8gSrlepSH4h0IxwT9g-qKyR0A_mHccg8kTb2xFTgsFg"

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