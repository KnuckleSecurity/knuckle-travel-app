const express = require('express')
const router = express.Router();
const googleMapsController = require('../../controllers/googleMapsController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')
const isUserInDb = require('../../middleware/isUserInDb')
const handleRefreshToken = require('../../middleware/handleRefreshToken')
const authCheck = require('../../middleware/authCheck')


router.route('/')
    .get(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        googleMapsController.getReq)
    .post(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck, 
        googleMapsController.postReq)

module.exports = router;