const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contactController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')

router.route('/')
    .get(verifyAccessJWT,contactsController.getReq)

module.exports = router
