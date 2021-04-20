const express = require('express')
const { checkDuplicateUsernameOrEmail } = require('../middlewares/verifySignUp')

const authController = require('../controllers/authController')

const router = express.Router()

router.post('/register', checkDuplicateUsernameOrEmail, authController.register)
router.post('/login', authController.login)

module.exports = router
