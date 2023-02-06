var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
const { body } = require('express-validator');


router.get('/', brandController.index);

router.post('/add',[
    body('brand_name').notEmpty().withMessage("กรุณากรอกชื่อแบรนด์")
], brandController.add);



module.exports = router;