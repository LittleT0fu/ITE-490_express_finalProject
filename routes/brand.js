var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
const { body } = require('express-validator');

//middleware
const passportJWT = require('../middleWare/passportJWT');
const checkAdmin = require('../middleWare/checkAdmin');



router.get('/', brandController.index);
router.get('/brand' + '/tops', brandController.tops);

router.post('/add', [
    body('brand_name').notEmpty().withMessage("กรุณากรอกชื่อแบรนด์")
], brandController.addbrand);

router.post('/clothes' + '/add', [
    body('clothesName').not().isEmpty().withMessage("กรุณากรอกชื่อเสื้อผ้า"),
    body('clothesType').notEmpty().withMessage("กรุณากรอกชื่อเสื้อผ้า"),
    body('brand_name').notEmpty().withMessage("กรุณากรอกชื่อเสื้อผ้า")
], brandController.addclothes);



router.delete('/delete' + '/:id', [passportJWT.isLogin, checkAdmin.isAdmin], brandController.destroybrand);


module.exports = router;