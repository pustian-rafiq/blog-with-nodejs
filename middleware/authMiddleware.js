const User = require('../models/User')

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if(!req.session.isLoggedIn) {
            return next()
        }

        try {
            console.log("object");
            let user = await User.findById(req.session.user._id)
            req.user = user
            console.log("user",user);
            next(user)

        }catch(err) {
            console.log(err)
            next(err)
        }
    }
}

//Check for authenticated username

exports.isAuthenticated = (req, res, next) => {
    //If the user is not loggedin, it redirects to the login page. Otherwise it goes to next page
    if(!req.session.isLoggedIn) {
        return res.redirect('/auth/login')
    }
    next()
}