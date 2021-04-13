const express = require('express')

const auth = require('../middlewares/auth')
const meController = require('../controllers/meController')

const router = express.Router()

router.get('/', auth, meController.getUser)
router.put('/', auth, meController.updateUser)
router.get('/insights', auth, meController.getUserInsights)

module.exports = router
