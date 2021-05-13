const router = require('express').Router();
const fileController = require("../controllers/fileController");

router.post('/storeToS3', fileController.storeToS3);

router.get('/retrieveFromS3/:key', fileController.retrieveFromS3);

router.get('/listFiles', fileController.listFiles);


module.exports = router;