const express = require('express')
const router = express.Router()
const rootController = require('../controllers/rootController')
const verifyAccessJWT = require('../middleware/verifyAccessJWT')
const isUserInDb = require('../middleware/isUserInDb')
const handleRefreshToken = require('../middleware/handleRefreshToken')

router.route('/')
    .get(verifyAccessJWT, 
        handleRefreshToken, 
        isUserInDb, 
        rootController.getReq)
   

module.exports = router