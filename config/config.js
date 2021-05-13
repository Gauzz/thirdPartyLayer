module.exports = {
    awsConfig: {
        "accessKeyId": process.env.AWS_ACCESS_ID,
        "secretAccessKey": process.env.AWS_SECRET_KEY,
        "region": process.env.AWS_REGION,
        "url": "https://hello-s-three.s3.ap-south-1.amazonaws.com/"
    },
    coreLayerURL: process.env.CORE_URL
};