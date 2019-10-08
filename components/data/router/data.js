const express = require('express');
const env = require('dotenv').config();
const router = express.Router();
const cors = require('cors');

const authMiddleware = require('../../../middleware/auth')
//const authorization = require('../../../middleware/authorization');

const dataController = require('../controller/data');

/* GET ALL DATA*/
router.get('/',[cors(), authMiddleware,/* authorization('','')*/ ], dataController.all_data);
router.get('/metrics',[cors(), /*authMiddleware,/* authorization('','')*/ ], dataController.metrics);

module.exports = router;
