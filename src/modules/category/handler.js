const express = require("express");
const serverless = require("serverless-http");
const notFindMiddleware = require('../../middleware/notFindMiddleware');
const errorHandlerMiddleware = require('../../middleware/errorHandlerMiddleware');
const router = require('./router');

const app = express();

app.use(express.json());

app.use('/category',router)

app.use(notFindMiddleware);

app.use(errorHandlerMiddleware);


module.exports.handler = serverless(app);
