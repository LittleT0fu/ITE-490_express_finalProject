var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', userController.index);
router.get('/get' , userController.show);

module.exports = router;
