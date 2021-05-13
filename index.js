require('dotenv').config();
const express = require('express');
const FileUpload = require('express-fileupload');
var s3Route = require('./routes/s3Route');
const { genericErrorHandler, unknownRoutesHandler } = require('./handlers/error/errorHandler');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(FileUpload());

app.use('/s3', s3Route);

// this matches all routes and all methods
app.use(unknownRoutesHandler);
//Custom error handler. Always define at last
app.use(genericErrorHandler);

let port = process.env.NODE_PORT;
app.listen(port);
console.log(`Server started at port ${port}`);