const express = require('express');
// const swagger_Ui = require('swagger-ui-express');
// const swagger_Document = require('../../documentation/');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const JWTKEY = process.env.JWTKEY; 

let reqLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutos
    max: 120000, // 120 peticiones
    message: "Límite máximo de peticiones excedido"
});

module.exports = function (app) {
    app.use(helmet());
    app.use(express.static('publica'));
    app.use(express.json());
    app.disable('x-powered-by');
    // app.use('/delilah_documentation', swagger_Ui.serve, swagger_Ui.setup(swagger_Document));
    app.use(express.json({limit: '200kb'}));
    app.use(reqLimit);
};