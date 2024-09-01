const CheckLogin = require("../../middlewares/auth.middleware");
const CheckPermission = require("../../middlewares/rbac.middleware");
const ValidateRequest = require("../../middlewares/validate-request.middleware");
const cartCtrl = require("./cart.controller");
const { addToCartSchema } = require("./cart.validator");

const router= require("express").Router();

router.post('/add', 
    CheckLogin, 
    ValidateRequest(addToCartSchema),
    cartCtrl.addToCart
)

router.get('/list', 
    CheckLogin, 
    cartCtrl.listCart
    )
router.get('/order/list', 
    CheckLogin, 
    cartCtrl.listOrder
    )
router.delete(
    '/delete/:id', 
    CheckLogin, 
    cartCtrl.deleteItemFromCart
)

router.post("/order", 
    CheckLogin, 
    cartCtrl.createOrder
)

router.get("/incoming-order", CheckLogin, CheckPermission(['admin', 'farmer']), cartCtrl.incomingOrder)
router.get("/completed-order", CheckLogin, CheckPermission(['admin', 'farmer']), cartCtrl.listTransactions)
router.put("/dispatched/:id", CheckLogin, CheckPermission(['admin', 'farmer']), cartCtrl.dispatched)
router.put("/pay/:id", cartCtrl.pay)

module.exports = router;