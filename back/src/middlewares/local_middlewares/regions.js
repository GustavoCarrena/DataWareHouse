const Response = require('../../../classes/response');
const {employeesQueries} = require('../../a_model/employees');
const {regionsQueries} = require('../../a_model/regions');
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
    /*== Condiciones de ingreso de datos para alta de Regiones ===*/
    dataValidateInsertRegion: async (req, res, next) => {
        const regionBodyName = req.body.region_name;
        const getRegionName = await regionsQueries.getRegionName()
        const arrayFind = getRegionName.find(region => region.region_name == regionBodyName)

        arrayFind !== undefined ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `La región ${regionBodyName} ya se encuentra registrada`)):
        regionBodyName.length === 0 ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar un nombre de Región`)):
        typeof(regionBodyName) !== "string" ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Los únicos campos admitidos son alfanuméricos`)):
        regionBodyName === " " ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):
        next();
    },

    /*== Condiciones de ingreso de datos para alta de Paises ===*/
    dataValidateInsertCountry: async (req, res, next) => {
        const countryBodyId = req.body.id 
        const countryBodyName = req.body.country_name
        const countryBodyRegionId = req.body.region_id;

        const getCountryAllData = await regionsQueries.getAllCountries()

        const findId = getCountryAllData.map(getCountryAllData => getCountryAllData.id).find(id => id == countryBodyId);
        const findName = getCountryAllData.map(getCountryAllData => getCountryAllData.country_name).find(name => name == countryBodyName);
        const findRegion = getCountryAllData.map(getCountryAllData => getCountryAllData.region_id).find(region => region == countryBodyRegionId);

        (countryBodyId.length === 0|| countryBodyName.length === 0||countryBodyRegionId.length === 0) ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):
        (countryBodyId === " "|| countryBodyName === " "||countryBodyRegionId === " ") ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):       
        (typeof(countryBodyId) !== "string" || typeof(countryBodyName) !== "string" || typeof(countryBodyRegionId) !== "number") ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Alguno de los formatos requeridos para los datos ingresados no es válido`)):
        findId !== undefined ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id del País ${countryBodyId} ya se encuentra registrado`)):
        findName!== undefined ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Nombre del País ${countryBodyName} ya se encuentra registrado`)):
        findRegion === undefined ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id de la Región ${countryBodyRegionId} no existe`)): 
        next();
    },

};

module.exports = {regionsMiddlewares};