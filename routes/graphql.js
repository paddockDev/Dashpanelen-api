const express = require('express')

const graphqlController = require('../controllers/graphqlController')

const router = express.Router()

router.get('/issues', graphqlController.getIssues)
router.get('/me', graphqlController.getAuthenticatedUser)

module.exports = router
