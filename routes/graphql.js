const express = require('express')

const auth = require('../middlewares/auth')
const graphqlController = require('../controllers/graphqlController')

const router = express.Router()

router.get('/issues', auth, graphqlController.getIssues)
router.get('/me', auth, graphqlController.getAuthenticatedUser)

module.exports = router
