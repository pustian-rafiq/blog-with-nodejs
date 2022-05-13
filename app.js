const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
//Import Routes
const authRoutes = require('./routes/authRoute')

//Playground Routes
const validatorRoutes = require('./playground/validator')



// Setup View Engine
app.set('view engine','ejs')
app.set('views','views')

//Middleware Array
const middleware =[
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        //cookie: { secure: true }
    })
]

// Use middleware
app.use(middleware)

app.use('/auth', authRoutes)
//app.use('/playground', validatorRoutes)
// Route routes 
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    })
})

// Create server 
const PORT = process.env.PORT || 8080
//3MnOUqdPGJwMqrK5
mongoose.connect('mongodb+srv://nahar:nahar741@cluster0.qxga0.mongodb.net/blog?retryWrites=true&w=majority',{
    useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=> {
    console.log("Database Created")
    app.listen(PORT,()=> {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(err => {
    console.log(err)
})
