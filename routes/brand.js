var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
const { body } = require('express-validator');

//middleware
const passportJWT = require('../middleWare/passportJWT');
const checkAdmin = require('../middleWare/checkAdmin');
const brand = require('../models/brandModel');


//get
router.get('/', brandController.getBrand);
router.get('/clothes', brandController.getClothes);
router.get('/:id' + '/clothes', brandController.getBrandClothes);
router.get('/clothesType' + '/:id', brandController.findClothestype);

// router.get('/brand' + '/tops', brandController.tops);

//add brand
router.post('/add', [
    passportJWT.isLogin,
    checkAdmin.isAdmin,
    body('brand_name').toLowerCase().trim().notEmpty().withMessage("กรุณากรอกชื่อแบรนด์"),
], brandController.addbrand);


//add new clothes
router.post('/clothes' + '/add', [
    passportJWT.isLogin,
    checkAdmin.isAdmin,
    body('clothesName').toLowerCase().trim().not().isEmpty().withMessage("กรุณากรอกชื่อเสื้อผ้า"),
    body('clothesType').toLowerCase().trim().notEmpty().withMessage("กรุณากรอกชื่อเสื้อผ้า"),
    body('brand_name').toLowerCase().trim().notEmpty().withMessage("กรุณากรอกชื่อเสื้อผ้า")
], brandController.addclothes);



router.delete('/delete' + '/:id', [passportJWT.isLogin, checkAdmin.isAdmin], brandController.destroybrand);


module.exports = router;