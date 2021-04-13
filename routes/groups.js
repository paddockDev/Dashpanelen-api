const express = require('express')

const groupsController = require('../controllers/groupsController')

const router = express.Router()

router.get('/learning/:slug', groupsController.getGroupBySlug)

module.exports = router
