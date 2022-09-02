const express = require('express');
const mainController = require('../controllers/mainController');

const router = express.Router();
//defining routes for the controllers
router.route('/words').get(mainController.wordsEndPoint)
router.route('/ranks').post(mainController.rankEndPoint)


module.exports = router;
