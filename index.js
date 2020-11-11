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
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsak1WdWFCb1JNdlowTG1jY0xac2RrMDdmcVRTWE5OTXNUWG9NVUpJMkJHSmhuMEpHYiIsImp0aSI6ImY3Yzg3YmFiNDU2NjgyNWI3MjZhZWI4ZmExNGU5OTU4ODIwMDM2MzFhZjFlMTA1NjNmNDNiYzJjYmE0MDZlNDJkY2VkNGIzZDRmOTMzNDY5IiwiaWF0IjoxNjA1MTI4MDU3LCJuYmYiOjE2MDUxMjgwNTcsImV4cCI6MTYwNTEzMTY1Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.wxfsR1JUWLUop5ZgDCbEovjOqVqdRSKEYUKJ8-ZF6qYgX0p128wznOFqcYYu5gM2xPS3j7xNJogUVf9W925Cho6V6tcwQlihxHyxbd8ufqu7mleF_-0edUswsyCWE85hO_9Y19zy8op6g2eue5I7yJIF_1GDKjYfgXRraVSN0lbPq1LsQjADEXZ0OX4j8ZfUWTUXYmE_B-g7KK7aXvmz2DG7NDnrGmIPrZzkrTvTUEMudfpVR73ECMoEF-QIZ6pAsAn9kjIhDQ9yQ1fNCvusKpAgR8BzU4-R9XFM57-BZ2no9j9Rn8xEYkV-AdGAzCRBimdOAevArf2AKlFOiMMDNA"

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