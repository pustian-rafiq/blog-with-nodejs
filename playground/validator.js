const router = require('express').Router()
const { check, validationResult } = require('express-validator')
router.get('/validator', (req, res, next) => {
    res.render('playground/signup', { title: 'Playground validator' })
})
router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage('User can not be empty')
            .isLength({ max: 15 })
            .withMessage('Username can not be greater than 15 characters'),
        check('email')
            .isEmail()
            .withMessage('Please provide a valid email address'),
        check('password').custom(value => {
            if(value.length < 5){
                throw new Error('Password must be at least 5 characters')
            }
            return true
        }),
        check('confirm_password').custom((value, {req}) => {
            if(value != req.body.password){
                throw new Error('Password does not match')
            }
            return true
        })
    ],


    (req, res, next) => {
        let errors = validationResult(req)

        const formatter = (error) => error.msg
        console.log(errors.formatWith(formatter).mapped())
        res.render('playground/signup', { title: 'Playground validator' })
    })

module.exports = router