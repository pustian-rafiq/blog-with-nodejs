const User = require('../models/User')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {title:'Create a new account'})
    
}
exports.signupPostController = (req, res, next) => {
   const {username,email, password} = req.body;

   let user = new User({username, email, password})
   try {
      // let createdUser = await user.save()
       console.log("User created successfully",user)
       res.render('pages/auth/signup', {title:'Create a new account'})
   } catch (err) {
       console.log(err)
       next(err)
   }
   
}
exports.loginGetController = (req, res, next) => {

}
exports.loginPostController = (req, res, next) => {

}
exports.logoutController = (req, res, next) => {

}