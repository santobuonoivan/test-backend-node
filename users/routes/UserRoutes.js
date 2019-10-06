const express = require('express');
const env = require('dotenv').config();
const router = express.Router();
const cors = require('cors');

const authMiddleware = require('../../middleware/auth')
//const authorization = require('../../../middleware/authorization');

const userController = require('./../controllers/UserController');

/* GET ALL DATA*/
router.get('/',[cors(), authMiddleware/*, authorization('','')*/ ], userController.all_users);

/* ADD ONE DATA*/
router.post('/',[cors(), authMiddleware/*, authorization('','' )*/], userController.insert_user);

module.exports = router;