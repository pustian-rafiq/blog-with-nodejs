const User = require('../models/User')
const bcrypt = require('bcrypt')
const errorFormatter = require('../utils/validationErrorFormatter')
const {validationResult} = require('express-validator')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup',
     {
          title: 'Create a new account'
          ,error:{},
          value:{} 
        })

}

// Signup post controller

exports.signupPostController = async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log('USERNAME', username);
    console.log('USERNAME', email);
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) {
      return  res.render('pages/auth/signup',
       { 
           title: 'Create a new account',
           error: errors.mapped(),
           value:{
               username,email,password
           }
         })
    }



    try {
        let hassPassword = await bcrypt.hash(password, 11)
        let user = new User(
            {
                username,
                email,
                password: hassPassword
            }
        )
        let createdUser = await user.save()
        console.log("User created successfully", createdUser)
        res.render('pages/auth/signup', { title: 'Create a new account',error:{}, value:{}  })
    } catch (err) {
        console.log("err",err)
        next(err)
    }

}



exports.loginGetController = (req, res, next) => {
    // console.log("session",req.session)
    // console.log("session",req.session.isLoggedIn)
    // console.log("session",req.session.user)
    res.render('pages/auth/login', { title: 'Login to your account',error:{} })
}


exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body

    //Check login validation
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) {
        return  res.render('pages/auth/login',
         { 
             title: 'Login to your account',
             error: errors.mapped(),
           })
      }
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.json({
                message: 'This credentials does not match.'
            })
        }
        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({
                message: 'This credentials does not match.'
            })
        }
      // res.setHeader('Set-Cookie', 'isLoggedIn=true')
      // set session and cookie 
      req.session.isLoggedIn = true
      req.session.user = user
       console.log("Logging in...")
        res.render('pages/auth/login', { title: 'Login to your account',error:{} })

    } catch (err) {
        console.log(err)
        next(err)
    }


}
exports.logoutController = (req, res, next) => {

}