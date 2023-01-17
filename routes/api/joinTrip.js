const express = require('express')
const router = express.Router();
const joinTripController = require('../../controllers/joinTripController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')
const isUserInDb = require('../../middleware/isUserInDb')
const handleRefreshToken = require('../../middleware/handleRefreshToken')
const authCheck = require('../../middleware/authCheck')


router.route('/')
    .post(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        joinTripController.postReq)

module.exports = router;