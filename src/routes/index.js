const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const authorizationMiddleware = require('../middleware/api')

router.get('/', controllers.home)
router.get('/:code', controllers.redirectURL)
router.post('/api/shorten', authorizationMiddleware, controllers.createShortURL)

module.exports = router
