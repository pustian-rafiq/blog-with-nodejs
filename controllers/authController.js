const User = require('../models/User')
const bcrypt = require('bcrypt')
exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', { title: 'Create a new account' })

}
exports.signupPostController = async (req, res, next) => {
    const { username, email, password } = req.body;


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
        res.render('pages/auth/signup', { title: 'Create a new account' })
    } catch (err) {
        console.log(err)
        next(err)
    }

}
exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', { title: 'Login to your account' })
}
exports.loginPostController = async (req, res, next) => {
    let {email, password} = req.body

    try {
        let user = await User.findOne({ email: email})
        if(!user) {
            return res.json({
                message: 'This credentials does not match.'
            })
        }
        let match = await bcrypt.compare(password, user.password)
        if(!match) {
            return res.json({
                message: 'This credentials does not match.'
            })
        }
        console.log("Successfully logged in to your account")
        res.render('pages/auth/login', { title: 'Login to your account' })

    }catch (err) {
        console.log(err)
        next(err)
    }


}
exports.logoutController = (req, res, next) => {

}