
var express = require('express');
const router = express.Router();

const paymentController = require("../controllers/payment.controller");

router.post("/create-checkout-session", paymentController.checkoutSession);
router.post("/create-portal-session", paymentController.portalSession);
router.post("/cancel-subscription", paymentController.deleteSubscription);
router.post("/update-lookup", paymentController.updatePrices);
router.post("/webhook",paymentController.webhook);


module.exports = router;    
