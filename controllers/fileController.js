
const HttpStatus = require('http-status-codes');
const { RESPONSE_STATUS } = require('../config/constants');
const service = require('../services/fileService');


const storeToS3 = async (req, res) => {
    if (req.files && req.files.file) {
        let responseObj = await service.storeToS3(req.files.file);
        res.send(responseObj);
    } else
        res.send({ status: 400, error: { message: "Bad Request" } });

};

const retrieveFromS3 = async (req, res) => {
    if (req.params.key) {
        let responseObj = await service.retrieveFromS3(req.params.key);
        res.send(responseObj);
    } else
        res.send({ status: 400, error: { message: "Bad Request" } });

};

const listFiles = async (req, res) => {
    var data = await service.listFiles(req.query.filter, req.query.page, req.query.limit);
    if (data.error) {
        res.send({
            status: RESPONSE_STATUS.STATUS_FAIL,
            error: data.error
        });
    } else {
        res.send({
            status: RESPONSE_STATUS.STATUS_SUCCESS,
            data
        });

    }
};



module.exports = {
    storeToS3,
    retrieveFromS3,
    listFiles
};