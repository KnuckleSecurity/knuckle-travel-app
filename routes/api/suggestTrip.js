const express = require('express')
const router = express.Router();
const suggestTripController = require('../../controllers/suggestTripController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')
const isUserInDb = require('../../middleware/isUserInDb')
const handleRefreshToken = require('../../middleware/handleRefreshToken')
const authCheck = require('../../middleware/authCheck')
const latLongIdent = require('../../middleware/latLongIdent')
const weatherForecast = require('../../middleware/weatherForecast')



router.route('/')
    .get(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        suggestTripController.getReq)
    .post(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        latLongIdent,
        weatherForecast,
        suggestTripController.postReq)

module.exports = router;
