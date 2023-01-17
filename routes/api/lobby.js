const express = require('express')
const router = express.Router()
const lobbyController = require('../../controllers/lobbyController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')
const isUserInDb = require('../../middleware/isUserInDb')
const handleRefreshToken = require('../../middleware/handleRefreshToken')
const authCheck = require('../../middleware/authCheck')

router.route('/')
    .get(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        lobbyController.getReq)

module.exports = router
