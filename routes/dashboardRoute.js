const router = require('express').Router();

const {dashboardGetController} = require('../controllers/dashboardController')
const {isAuthenticated} = require('../middleware/authMiddleware')
//Middleware always take place between the url and the controller
router.get('/',isAuthenticated, dashboardGetController);

module.exports = router