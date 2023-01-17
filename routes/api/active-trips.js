const express = require('express')
const router = express.Router();
const activeTripsController = require('../../controllers/activeTripsController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')
const isUserInDb = require('../../middleware/isUserInDb')
const handleRefreshToken = require('../../middleware/handleRefreshToken')
const authCheck = require('../../middleware/authCheck')


router.route('/')
    .get(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        activeTripsController.getReq)
    .post(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        activeTripsController.postReq)

module.exports = router;