var express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
var router = express.Router();
const authRotuer = require('./auth.route')
const userRotuer = require('./user.route')
const writeSonicApiRotuer = require('./writeSonicApi.route')
const contactRouter = require('./contact.route')
const paymentRotuer = require('./payment.route')
const languageRotuer = require('./language.route')
const draftRotuer = require('./draft.route')

/* GET home page. */

router.use('/auth',authRotuer);
router.use('/user',authMiddleware,userRotuer);
router.use('/writeSonicApi',authMiddleware,writeSonicApiRotuer);
router.use('/contact',contactRouter);
router.use('/payment',paymentRotuer);
router.use('/language',languageRotuer);
router.use('/draft',authMiddleware,draftRotuer);


module.exports = router;
