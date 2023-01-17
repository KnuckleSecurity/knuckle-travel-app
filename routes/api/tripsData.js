const express = require('express')
const router = express.Router();
const tripsDataController= require('../../controllers/tripsDataController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')
const isUserInDb = require('../../middleware/isUserInDb')
const handleRefreshToken = require('../../middleware/handleRefreshToken')
const authCheck = require('../../middleware/authCheck')




router.route('/')
    .get(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        tripsDataController.getReq)
    .post(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        authCheck,
        tripsDataController.postReq)


module.exports = router;
