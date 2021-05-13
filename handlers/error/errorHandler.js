const HttpStatus = require('http-status-codes');
/**
 * catch-all error handler
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const genericErrorHandler = function (error, req, res, next) {
    res.status(error.errorCode || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: {
            errorCode: error.errorCode || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message || 'Something went wrong. Please try again'
        }
    });
};

/**
 * Unknown routes handler
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const unknownRoutesHandler = function (req, res, next) {
    const error = new Error('API not found');
    error.errorCode = HttpStatus.StatusCodes.NOT_FOUND;
    next(error);
};

module.exports = {
    genericErrorHandler, unknownRoutesHandler
};