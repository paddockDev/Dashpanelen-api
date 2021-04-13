const express = require('express')

const userController = require('../controllers/userController')

const router = express.Router()

router.get('/:username', userController.getUserByUsername)
router.get('/:username/insights', userController.getUserInsightsByUsername)

module.exports = router
