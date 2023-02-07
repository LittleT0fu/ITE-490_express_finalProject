var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
const { body } = require('express-validator');

//middleware
const passportJWT = require('../middleWare/passportJWT');
const checkAdmin = require('../middleWare/checkAdmin');



router.get('/', brandController.index);

router.post('/add',[
    body('brand_name').notEmpty().withMessage("กรุณากรอกชื่อแบรนด์")
], brandController.add);


router.delete('/delete'+'/:id',[passportJWT.isLogin, checkAdmin.isAdmin], brandController.destroy);


module.exports = router;