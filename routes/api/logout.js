const express = require('express')
const router = express.Router();
const logOutController = require('../../controllers/logOutController')
router.route('/')
  .get(logOutController.getReq)

module.exports = router
