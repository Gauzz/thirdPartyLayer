class NotFoundError extends Error {
    constructor (message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.errorCode = 2004;
    }

    statusCode () {
        return this.errorCode;
    }
}

module.exports = NotFoundError;