const express = require('express');
const env = require('dotenv').config();
const router = express.Router();
const cors = require('cors');

const authMiddleware = require('../../../middleware/auth')
//const authorization = require('../../../middleware/authorization');

const filesController = require('./../controller/files');

/* GET ALL DATA*/
router.get('/list',[cors(), authMiddleware,/* authorization('','')*/ ], filesController.all_files);
router.get('/metrics',[cors(), authMiddleware,/* authorization('','')*/ ], filesController.metrics);

module.exports = router;