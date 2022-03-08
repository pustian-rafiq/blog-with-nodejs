const router = require('express').Router();
//mongodb+srv://<username>:<password>@cluster0.qxga0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require('../controllers/authController')

router.get('/signup', signupGetController)
router.post('/signup', signupPostController)

router.get('/login', loginGetController)
router.post('/login', loginPostController)

router.get('/logout', logoutController)


module.exports = router