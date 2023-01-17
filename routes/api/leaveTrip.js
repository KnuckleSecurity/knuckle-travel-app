const express = require('express')
const router = express.Router();
const leaveTripController = require('../../controllers/leaveTripController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')
const isUserInDb = require('../../middleware/isUserInDb')
const handleRefreshToken = require('../../middleware/handleRefreshToken')
const authCheck = require('../../middleware/authCheck')


router.route('/')
    .post(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        leaveTripController.postReq)

module.exports = router;