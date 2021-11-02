const Response = require('../../../classes/response');
// const {employeesQueries} = require('../../a_model/employees');
const {regionsQueries} = require('../../a_model/regions');
// const {regions} = require('../../b_controllers/regions')
// const jwt = require('jsonwebtoken');
// const JWTKEY = process.env.JWTKEY;


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

        regionBodyName.length === 0 ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):

        regionBodyName === " " ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):

        typeof(regionBodyName) !== "string" ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Los únicos campos admitidos son alfanuméricos`)):

        arrayFind !== undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `La región ${regionBodyName} ya se encuentra registrada`)):

        next();
    },

    /*== Condiciones de ingreso de datos para alta de Paises ===*/
    dataValidateInsertCountry: async (req, res, next) => {
        const countryBodyId = req.body.id.toUpperCase();
        const countryBodyName = req.body.country_name;
        const countryBodyRegionId = req.body.region_id;

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
    },

       /*== Condiciones de ingreso de datos para alta de Ciudades ===*/
       dataValidateInsertCity: async (req, res, next) => {

        // const {id, city_name,country_id} = req.body;
        
        const id = req.body.id;
        const city_name = req.body.city_name;
        const country_id = req.body.country_id;
        
        
        const getCityAllData = await regionsQueries.getAllCities()
        const countryId = await regionsQueries.getAllCountries()

        const findId = getCityAllData.map(ci => ci.id).find(ciid => ciid == id);
        const findName = getCityAllData.map(ci => ci.city_name).find(name => name == city_name);
        const findCountry = countryId.map(r => r.id).find(r => r == country_id);
        
        (typeof(id) !== "number" || typeof(city_name) !== "string" || typeof(country_id) !== "string" || country_id !== country_id.toUpperCase()) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Alguno de los formatos requeridos para los datos ingresados no es válido`)):


        findId !== undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id de la Ciudad ${req.body.id} ya se encuentra registrado`)):
        
        findName!== undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Nombre de la Ciudad ${req.body.city_name} ya se encuentra registrado`)):
        
        findCountry === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id del País ${country_id} no existe. Toda Ciudad debe estar asociada a un País`)): 

        (req.body['id'].length === 0|| req.body['city_name'].length === 0||req.body['country_id'].length === 0) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):
        
        (req.body['id'] === " "||  req.body['city_name'] === " "||req.body['country_id'] === " ") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):       
        
        
        country_id.length !== 3 ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Los Id de los paises deben ser de 3 caracteres`)):

        next();
    },

    /*== Condiciones de ingreso de datos para actualización de nombre Regiones ===*/
    dataValidateUpdateRegion: async (req, res, next) => {
        
        const {id, region_name} = req.body;
        
        const regionData = await regionsQueries.getRegions();
        const findId = regionData.map(r => r.id).find(id => id == req.body['id']);

        (req.body['id'].length === 0|| req.body['region_name'].length === 0) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):
        
        (req.body['id'] === " "||  req.body['region_name'] === " ") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):       
        
        (typeof(req.body['id']) !== "number" || typeof(req.body['region_name']) !== "string") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Alguno de los formatos requeridos para los datos ingresados no es válido`)):

        findId === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id de la Region ${req.body.id} no existe`)):
        
        next();
    },

    /*== Condiciones de ingreso de datos para actualización de Paises ===*/
    dataValidateUpdateCountry: async (req, res, next) => {
        
        const {country_name, region_id} = req.body;
        const id = req.body.id;

        const countryData = await regionsQueries.getAllCountries(); 
        const findId = countryData.map(co => co.id).find(coid => coid == id);
        const regionData = await regionsQueries.getRegions()
        const findRegionId = regionData.map(r => r.id).find(r => r == req.body.region_id);
        
        (typeof(id) !== "string" || id !== id.toUpperCase() || typeof(req.body['country_name']) !== "string" || typeof(req.body['region_id']) !== "number") ? 
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
    },

    /*== Condiciones de ingreso de datos para actualización de Ciudades ===*/
    dataValidateUpdateCity: async (req, res, next) => {
    
        const {id, city_name} = req.body;
        const country_id = req.body.country_id

        const cityData = await regionsQueries.getAllCities(); 
        const findCityId = cityData.map(ci => ci.id).find(cid => cid == req.body.id);

        const countryData = await regionsQueries.getAllCountries()
        const findCountryId = countryData.map(co => co.id).find(co => co == country_id);

        (req.body.id === " "||  req.body['city_name'] === " " || country_id === " " ) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):       

        (req.body.id.length === 0|| req.body['city_name'].length === 0 || country_id.length === 0) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):

        country_id.length !== 3 ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Los Id de los paises deben ser de 3 caracteres`)):

        findCityId === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id de la Ciudad ${req.body.id} no existe`)):
        
        (typeof(req.body.id) !== "number" || typeof(req.body['city_name']) !== "string" || typeof(req.body['country_id']) !== "string") || req.body.country_id !== req.body.country_id.toUpperCase() ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Alguno de los formatos requeridos para los datos ingresados no es válido`)):
        
        findCountryId === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id del Pais ${country_id.toUpperCase()} no existe`)):
        
        next();
    },
    
    dataValidateDeleteRegion: async (req, res, next) => {
    
        const {id} = req.body;
        
        
        const getAllDataRegions = await regionsQueries.getAllDataRegions();
        const getCountryByRegion = await regionsQueries.getCountriesByRegion(id);
        const findCountryId = getAllDataRegions.map(co => co.country_id) 
        const onlyCountries = getCountryByRegion.map(co => co.country_id).find(co => co);
        const countryAndCities = findCountryId.find(co=>co === onlyCountries) 
        const getRegions = await regionsQueries.getRegions()
        const regionExist = getRegions.map(r => r.id).find(r=>r === id) //que exista el codigo de region ingresado
        
        req.body.id === " " ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):       

        req.body.id.length === 0 ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):

        typeof(req.body.id) !== "number"  ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El campo debe ser numérico", "")):

        (countryAndCities === undefined && onlyCountries === undefined && regionExist === undefined) ? // Si tiene esta combinación, no existe la region
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. La región que desea eliminar no existe",req.body.id)):
        getCountryByRegion.length !== 0 && findCountryId !== undefined ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Debe eliminar los siguientes Países y Ciudades dependientes antes de poder ejecutar esta tarea",getCountryByRegion)):
        
        next()

    },

    dataValidateDeleteCountry: async (req, res, next) => {
    
        const {id} = req.body;
        
        const getAllCountrysData = await regionsQueries.getAllCountries();
        const validateCountryDb = getAllCountrysData.map(co => co.id).find(cod => cod == req.body.id);//Si existe Pais en la base para eliminar
        
        const getCitiesByCountry = await regionsQueries.getCitiesByCountry(id)
        const getcityId = getCitiesByCountry.map(co => co.city_id)/*.find(cid => cid == getCitiesByCountry)*/

        req.body.id === " " ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):       

        req.body.id.length === 0 ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):

        typeof(req.body.id) !== "string"  ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El campo debe ser texto", "")):


        validateCountryDb === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El País que desea eliminar no existe",req.body.id)):
        getcityId.length !== 0 ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El País tiene ciudades asociadas",getCitiesByCountry)):

        next()
    },

    dataValidateDeleteCity: async (req, res, next) => {
    
        const id = req.body.id;
        
        const getAllCitysData = await regionsQueries.getAllCities();
        const validateCityDb = getAllCitysData.map(co => co.id).find(cod => cod == id);//Si existe Ciudad en la base para eliminar

        req.body.id === " " ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar un caracter vacío`)):       

        req.body.id.length === 0 ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):

        typeof(req.body.id) !== "number"  ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El campo debe ser numérico", "")):

        validateCityDb === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. La ciudad que desea eliminar no existe",req.body.id)):

        next()
    },

};

module.exports = {regionsMiddlewares};