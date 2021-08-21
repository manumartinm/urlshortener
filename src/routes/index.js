const express = require('express')

const router = express.Router()

const controllers = require('../controllers')

router.get('/api/redirect/:code', controllers.redirectURL)
router.post('/api/shorten', controllers.createShortURL)

module.exports = router
