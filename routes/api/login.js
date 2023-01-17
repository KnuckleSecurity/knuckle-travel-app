const express = require('express')
const router = express.Router();
const loginController = require('../../controllers/loginController')
const verifyAccessJWT = require('../../middleware/verifyAccessJWT')
const isUserInDb = require('../../middleware/isUserInDb')
const handleRefreshToken = require('../../middleware/handleRefreshToken')

router.route('/')
    .get(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb, 
        loginController.getReq)
    .post(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb,
        loginController.postReq)

module.exports = router;