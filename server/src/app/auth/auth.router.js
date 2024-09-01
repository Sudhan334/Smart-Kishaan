//imports
const router = require('express').Router();
const authCtrl = require('../auth/auth.controller');
const {registerSchema, passwordSchema, loginSchema, emailSchema} = require('../auth/auth.validator');
const uploader = require('../../middlewares/uploader.middleware');
const validateRequest = require('../../middlewares/validate-request.middleware');
const checkLogin = require('../../middlewares/auth.middleware');

//Upload directory setup middleware
const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/users';
    next();
}

//apis
router.post('/register', dirSetup, uploader.single('image'), validateRequest(registerSchema), authCtrl.register);
router.get('/verify-token/:token', authCtrl.verifyToken);
router.post('/set-password/:token', validateRequest(passwordSchema), authCtrl.setPassword);
router.post('/login', validateRequest(loginSchema), authCtrl.login);
router.get('/me', checkLogin, authCtrl.getLoggedInUser);
router.post('/forget-password', validateRequest(emailSchema), authCtrl.forgetPassword);
router.post('/reset-password/:resetToken', validateRequest(passwordSchema), authCtrl.resetPassword);
router.post('/logout', checkLogin, authCtrl.logout);

//exports
module.exports = router;