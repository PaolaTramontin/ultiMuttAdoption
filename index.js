const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')

//setup ejs and ejs layouts
app.set('view engine', 'ejs')
app.use(ejsLayouts) 



//middleweare to make req.body work. ALWAYS put it above the controller middlewear
app.use(express.urlencoded({extended: false}))





//controllers midware. This is what allows us to use the controllers routes
app.use('/auth', require('./controllers/auth.js'))







app.get('/', (req, res)=>{
    res.send('EXPRESS AUTH HOME ROUTE')
})




app.listen(8000, ()=>{
    console.log('youre now in port 8000')
})