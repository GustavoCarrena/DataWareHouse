const Response = require('../../../classes/response');
const {employeesQueries} = require('../../a_model/employees')
const jwt = require('jsonwebtoken');
const JWTKEY = process.env.JWTKEY;


const regionsMiddlewares = {

    dataFillCountryValidate:  (req, res, next) => {
        const data = req.body.region_id;
        !data 
        ? res.status(400).send(new Response(true, 400, "No se pudo efectuar la consulta", "Todos los campos deben contener datos"))
        :next();
    },

    dataFillCityValidate:  (req, res, next) => {
        const data = req.body.country_id;
        !data 
        ? res.status(400).send(new Response(true, 400, "No se pudo efectuar la consulta", "Todos los campos deben contener datos"))
        :next();
    },



};

module.exports = {regionsMiddlewares};