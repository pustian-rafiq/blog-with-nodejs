const express = require('express')
const morgan = require('morgan')

const app = express()

// Setup View Engine
app.set('view engine','ejs')
app.set('views','views')

//Middleware Array
const middleware =[
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
]

// Use middleware
app.use(middleware)

// Route directory 
app.get('/', (req, res) => {

    res.render('pages/auth/signup',{title: 'Create a new account'})

    res.json({
        message: 'Hello world'
    })
})

// Create server 
const PORT = process.env.PORT || 8080
app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`)
})