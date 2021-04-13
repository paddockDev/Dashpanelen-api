const express = require('express')

const oauthController = require('../controllers/oauthController')

const router = express.Router()

router.get('/callback', oauthController.callback)
router.get('/redirect', oauthController.redirect)

module.exports = router
