/* eslint-disable id-length */
const joi = require("joi");

const listFilesSchema = joi.object({
    folder: joi.string().required()
});




module.exports = {
    listFilesSchema
};