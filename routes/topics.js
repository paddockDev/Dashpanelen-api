const express = require('express')

const topicsController = require('../controllers/topicsController')

const router = express.Router()

router.get('/:slug', topicsController.getTopicBySlug)

module.exports = router
