
var aws = require('aws-sdk');
var config = require('../config/config');
const uuid = require('uuid');
const qs = require('query-string');
const { CoreLayerAPI } = require('../API/RESTClient');
const { RESTMethod, CORE } = require('../API/endpoints');
const { awsConfig } = require('../config/config');

aws.config.update(config.awsConfig);


const storeToS3 = async (file) => {
    try {
        let fileKey = `${uuid.v4()}` + '.' + file.name.split('.').pop();// for unique file key
        var params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: file.data,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        var awsS3Bucket = new aws.S3();
        let data = await awsS3Bucket.upload(params).promise();
        CoreLayerAPI({
            url: CORE.file.create,
            method: RESTMethod.POST,
            data: { displayName: file.name, key: fileKey, url: awsConfig.url + fileKey }
        });
        return { status: 200, data: data };
    } catch (error) {
        return {
            status: 500,
            error: {
                message: error.message || 'Something went wrong'
            }
        };
    }
};
const retrieveFromS3 = async (fileKey) => {
    try {
        var params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${fileKey}`
        };
        var awsS3Bucket = new aws.S3();
        var response = await awsS3Bucket.getObject(params).promise();
        return response;
    } catch (error) {
        return {
            status: 500,
            error: {
                message: error.message || 'Something went wrong'
            }
        };
    }
};

const listFiles = async (filter, page, limit) => {
    try {
        let params = qs.stringify({ filter, page, limit });
        let response = await CoreLayerAPI({
            url: CORE.file.list,
            method: RESTMethod.GET,
            params: params
        });
        let files = [];
        if (response.data.length > 0)
            await response.data.forEach(async (file) => {
                let fileObject = {
                    key: file.key,
                    name: file.displayName,
                    url: file.url,
                    lastModified: file.updatedAt,
                    createdAt: file.createdAt
                }
                await files.push(fileObject);
            })

        return { status: 200, data: files };
    } catch (error) {
        return {
            status: 500,
            error: {
                message: error.message || 'Something went wrong'
            }
        };
    }
};


module.exports = {
    storeToS3,
    retrieveFromS3,
    listFiles
};