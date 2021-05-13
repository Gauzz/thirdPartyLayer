class UpdateError extends Error {
    constructor (message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.errorCode = 2002;
    }

    statusCode () {
        return this.errorCode;
    }
}

module.exports = UpdateError;