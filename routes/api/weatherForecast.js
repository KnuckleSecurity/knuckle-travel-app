const express = require('express')
const router = express.Router();
const weatherForecastController = require('../../controllers/weatherForecastController')
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
        latLongIdent,
        weatherForecast,
        weatherForecastController.getReq)


module.exports = router;