const Response = require('../../../classes/response');
// const {employeesQueries} = require('../../a_model/employees');
const {regionsQueries} = require('../../a_model/regions');
// const {regions} = require('../../b_controllers/regions')
// const jwt = require('jsonwebtoken');
// const JWTKEY = process.env.JWTKEY;


const regionsMiddlewares = {

    dataFillCountryValidate: async  (req, res, next) => {
        const region_id = parseInt(req.params.region_id);
        const getCountriesByRegion = await regionsQueries.getCountriesByRegion(region_id);
        const region = getCountriesByRegion.find(c => c.region_id === region_id);
        region === undefined ? res.status(400).send(new Response(true, 400, "No existe el código de Región ingresado","")):
        next();
    },//ok!!!

    dataFillCityValidate: async (req, res, next) => {
        const country_id = req.params.country_id;
        const getCountriesByRegion = await regionsQueries.getCitiesByCountry(country_id);
        const country = getCountriesByRegion.find(c => c.country_id === country_id);
        country === undefined ? res.status(400).send(new Response(true, 400, "No existe el código de Pais ingresado","")):
        next();
    },//ok!!!
    
    /*== Condiciones de ingreso de datos para alta de Regiones ===*/
    dataValidateInsertRegion: async (req, res, next) => {
        const regionBodyName = req.body.region_name;
        const getRegionName = await regionsQueries.getRegionName()
        const arrayFind = getRegionName.find(region => region.region_name == regionBodyName)

        regionBodyName.length === 0 ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):

        regionBodyName === " " ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):

        typeof(regionBodyName) !== "string" ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Los únicos campos admitidos son alfanuméricos`)):

        arrayFind !== undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `La región ${regionBodyName} ya se encuentra registrada`)):

        next();
    },//OK!!!!

    /*== Condiciones de ingreso de datos para alta de Paises ===*/
    dataValidateInsertCountry: async (req, res, next) => {
        const countryBodyId = req.body.id.toUpperCase();
        const countryBodyName = req.body.country_name;
        const countryBodyRegionId = parseInt(req.params.region_id);

        const getCountryAllData = await regionsQueries.getAllCountries()
        const regionId = await regionsQueries.getRegions()

        const findId = getCountryAllData.map(getCountryAllData => getCountryAllData.id).find(id => id == countryBodyId);
        const findName = getCountryAllData.map(getCountryAllData => getCountryAllData.country_name).find(name => name == countryBodyName);
        const findRegion = regionId.map(r => r.id).find(r => r == countryBodyRegionId);

        findId !== undefined ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id del País ${countryBodyId} ya se encuentra registrado`)):
        findName!== undefined ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Nombre del País ${countryBodyName} ya se encuentra registrado`)):
        findRegion === undefined ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id de la Región ${countryBodyRegionId} no existe. Todo País debe estar asociado a una Región`)): 

        countryBodyId.length !== 3 ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Los Id de los paises deben ser de 3 caracteres`)):
        (countryBodyId.length === 0|| countryBodyName.length === 0||countryBodyRegionId.length === 0) ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):
        (countryBodyId === " "|| countryBodyName === " "||countryBodyRegionId === " ") ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):       
        (typeof(countryBodyId) !== "string" || typeof(countryBodyName) !== "string" || typeof(countryBodyRegionId) !== "number") ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Alguno de los formatos requeridos para los datos ingresados no es válido`)):
        
        next();
    },//OK!!!

       /*== Condiciones de ingreso de datos para alta de Ciudades ===*/
       dataValidateInsertCity: async (req, res, next) => {

        const city_name = req.body.city_name;
        const id = req.params.id.toUpperCase();
        const getCityAllData = await regionsQueries.getAllCities()
        const countryId = await regionsQueries.getAllCountries()
        const findName = getCityAllData.find(name => name.city_name == city_name);
        const findCountry = countryId.find(r => r.id == id);

        id.length !== 3 ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Los Id de los paises deben ser de 3 caracteres","")):

        !findCountry ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación El Pais no existe","")):
        
        findName !== undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación El Nombre de la Ciudad ya se encuentra registrado","")):
        
        (req.body['city_name'].length === 0||req.params['id'].length === 0) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Debe ingresar todos los datos", "")):
        
        (req.body['city_name'] === " "||req.params['id'] === " ") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. No puede insertar un caracter vacío", "")):       
        
        next();
    },//ok!!!

    /*== Condiciones de ingreso de datos para actualización de nombre Regiones ===*/
    dataValidateUpdateRegion: async (req, res, next) => {
        
        const id = parseInt(req.params.id);
        const region_name = req.body.region_name;
        const regionData = await regionsQueries.getRegions();
        const findId = regionData.map(r => r.id).find(id => id == req.params['id']);

        (id === null|| region_name.length === 0) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación.Debe ingresar todos los datos", "")):
        
        (id === " "||  region_name === " ") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. No puede insertar un caracter vacío", "")):       
        
        (typeof id  !== "number" || typeof region_name  !== "string") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Alguno de los formatos requeridos para los datos ingresados no es válido", "")):

        findId === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El Id de la Region no existe","")):
        
        next();
    },//ok!!!!


    /*== Condiciones de ingreso de datos para actualización de Paises ===*/
    dataValidateUpdateCountry: async (req, res, next) => {

        const {country_name,region_id } = req.body;
        const id = req.params.id;
        const countryData = await regionsQueries.getAllCountries(); 
        const findId = countryData.map(co => co.id).find(coid => coid == id);
        const regionData = await regionsQueries.getRegions()
        const findRegionId = regionData.map(r => r.id).find(r => r == region_id);
        
        (typeof id !== "string" || id !== id.toUpperCase() || typeof(req.body['country_name']) !== "string" || typeof(req.body['region_id']) !== "number") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Alguno de los formatos requeridos para los datos ingresados no es válido`)):

        (id === " "||  req.body['country_name'] === " " ||req.body['region_id'] === " ") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar caracter vacio`)):       

        (id.length === 0|| req.body['country_name'].length === 0 || req.body.region_id.length === 0) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):

        id.length !== 3 ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Los Id de los paises deben ser de 3 caracteres`)):

        findId === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id del Pais ${id} no existe`)):
        findRegionId === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id de la region ${req.body.region_id} no existe`)):

        next();
    },//ok!!!





    /*== Condiciones de ingreso de datos para actualización de Ciudades ===*/
    dataValidateUpdateCity: async (req, res, next) => {
    
        const {city_name,country_id} = req.body;
        const id = parseInt(req.params.id);

        const cityData = await regionsQueries.getAllCities(); 
        const findCityId = cityData.map(ci => ci.id).find(cid => cid == id);

        const countryData = await regionsQueries.getAllCountries()
        const findCountryId = countryData.map(co => co.id).find(co => co == country_id);

        (id === " "||  req.body['city_name'] === " " || country_id === " " ) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación,No puede insertar un caracter vacío", "")):       

        (id.toString().length === 0|| req.body['city_name'].length === 0 || country_id.length === 0) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Debe ingresar todos los datos", "")):

        country_id.length !== 3 ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Los Id de los paises deben ser de 3 caracteres", "")):

        findCityId === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El Id de la Ciudad no existe", "")):
        
        (typeof(id) !== "number" || typeof(req.body['city_name']) !== "string" || typeof(req.body['country_id']) !== "string") || req.body.country_id !== req.body.country_id.toUpperCase() ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Alguno de los formatos requeridos para los datos ingresados no es válido", "")):
        
        findCountryId === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación.El Id del Pais no existe", "")):
        
        next();
    },//Ok!!!
    
    dataValidateDeleteRegion: async (req, res, next) => {
    
        const id = parseInt(req.params.id);
        
        const getAllDataRegions = await regionsQueries.getAllDataRegions();
        const getCountryByRegion = await regionsQueries.getCountriesByRegion(id);
        const findCountryId = getAllDataRegions.map(co => co.country_id) 
        const onlyCountries = getCountryByRegion.map(co => co.country_id).find(co => co);
        const countryAndCities = findCountryId.find(co=>co === onlyCountries) 
        const getRegions = await regionsQueries.getRegions()
        const regionExist = getRegions.map(r => r.id).find(r=>r === id) //que exista el codigo de region ingresado
        
        id.toString().length === 0 || id === " " ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Debe ingresar todos los datos", "")):

        typeof id !== "number"  ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El campo debe ser numérico", "")):

        (countryAndCities === undefined && onlyCountries === undefined && regionExist === undefined) ? // Si tiene esta combinación, no existe la region
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. La región que desea eliminar no existe","")):
        
        next()

    },//ok!!!!

    dataValidateDeleteCountry: async (req, res, next) => {
    
        const id = req.params.id.toUpperCase();
        
        const getAllCountrysData = await regionsQueries.getAllCountries();
        const validateCountryDb = getAllCountrysData.map(co => co.id).find(cod => cod == id);//Si existe Pais en la base para eliminar
        
        id === " " || id.length === 0 ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. No puede insertar un caracter vacío", "")):       

        typeof id !== "string" || id.length !== 3  ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El Id del Pais debe ser texto y contiene 3 caracteres", "")):

        validateCountryDb === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El País que desea eliminar no existe","")):

        next()
    },//ok!!!

    dataValidateDeleteCity: async (req, res, next) => {
    
        const id = parseInt(req.params.id);
        
        const getAllCitysData = await regionsQueries.getAllCities();
        const validateCityDb = getAllCitysData.map(co => co.id).find(cod => cod == id);//Si existe Ciudad en la base para eliminar

        id === " " || id.toString().length === 0 ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id de ciudad no puede ser nulo", "")):       

        typeof id !== "number"  ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id debe ser numérico", "")):

        validateCityDb === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. La ciudad que desea eliminar no existe","")):

        next()
    },//ok!!

};

module.exports = {regionsMiddlewares};