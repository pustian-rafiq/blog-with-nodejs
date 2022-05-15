const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv')
dotenv.config()

// Store session information
var store = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 10
  });

//Import Routes
const authRoutes = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardRoute')

//Import Middleware
const {bindUserWithRequest} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')

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
        store: store
        //cookie: { secure: true }
    }), 
    bindUserWithRequest(),
    setLocals()
]

// Use middleware
app.use(middleware)

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)


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
mongoose.connect(process.env.MONGODB_URL, {
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
