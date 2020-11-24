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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6IjQ4OWYxM2Q5MjkyNjc3ZTA1MWE2ZTA1ZGNiMGQ0NzBjNWE5ZDZlOWQ5ZjAyMjIwOGU1Y2M3MzVjYjAyODk1MGNlODc3YmZlMzE4ODAxYmQxIiwiaWF0IjoxNjA2MTgwNzQxLCJuYmYiOjE2MDYxODA3NDEsImV4cCI6MTYwNjE4NDM0MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.S7uq4EnhIYnFGubq1jK72ImZphIwO_GtfFUtUAM-Mt0Dm7qSZdC0o_NJLYR8jcemZWjYJCJu0nLZLKhrIS4jlurw_1LFW4bXXaPQ7za178G4VRinqM7JL4apsYQdM5YhLYKx8c-sNyQJxz01G85keO3kzeMfDn0jIcGBIARd4xRoRRdHRV9UgkQ1PCmo5uUQ70N8MEcgh1_d0oZ1saxmTzjjaFcTH0ig363AyUMJCnMVae-g_TxoK4-ttV6GywjICHnueDsA4NwYHbvdMSTklrjQAtRES39sX0FO5yQaiscxqDNMYMuj6SFUj8HGVQ4-zzsx1oLnmarYqAEl9FoCsg";

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