const express = require('express')

const router = express.Router()

const controllers = require('../controllers')

router.get('/', controllers.home)
router.get('/:code', controllers.redirectURL)
router.post('/shorten', controllers.createShortURL)

module.exports = router
