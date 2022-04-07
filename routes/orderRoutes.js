const { Router } = require('express');
const router = Router();
const { getOrders, CreateOrder } = require('../controllers/orderControllers');
const verifyToken = require('../middlewares/verifyToken');

router.get('/v1/order', verifyToken, getOrders);
router.post('/v1/order', verifyToken, CreateOrder);

module.exports = router;
