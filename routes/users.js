var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator');

//middel ware
const passportJWT = require('../middleWare/passportJWT')
const checkAdmin = require('../middleWare/checkAdmin')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', userController.index);

//get all user
router.get('/get', [passportJWT.isLogin, checkAdmin.isAdmin], userController.show);

//register
router.post('/register', [
    body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อด้วย"),
    body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลล์").isEmail().withMessage("รูปแบบอีเมลล์ไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรณาใส่พาสเวิร์ด").isLength({ min: 5 }).withMessage("รหัสผ่านต้องมีค่ามากกว่า 5 ตัวอักษรขึ้นไป")
], userController.register)

//login
router.post('/login', [
    body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลล์").isEmail().withMessage("รูปแบบอีเมลล์ไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรณาใส่พาสเวิร์ด")
], userController.login)

//delete by id
router.delete('/delete' + '/:id', [passportJWT.isLogin, checkAdmin.isAdmin], userController.deleteByID)

//role changer
router.put('/role' + '/:id', [passportJWT.isLogin, checkAdmin.isAdmin], userController.rolechange)

module.exports = router;
