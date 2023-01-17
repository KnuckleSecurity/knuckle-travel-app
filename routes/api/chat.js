const express = require('express')
const router = express.Router()
const chatController = require('../../controllers/chatController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')
const isUserInDb = require('../../middleware/isUserInDb')
const handleRefreshToken = require('../../middleware/handleRefreshToken')
const authCheck = require('../../middleware/authCheck')

router.route('/')
    .get(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        chatController.getReq)

module.exports = router
