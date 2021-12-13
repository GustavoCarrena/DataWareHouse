const Response = require('../../../classes/response');
const {regionsQueries} = require('../../a_model/regions');

const regionsMiddlewares = {

    dataFillCityValidate: async (req, res, next) => {
        const country_id = req.params.country_id;
        const getCountriesByRegion = await regionsQueries.getCitiesByCountry(country_id);
        const country = getCountriesByRegion.find(c => c.country_id === country_id);
        country === undefined ? res.status(400).send(new Response(true, 400, "No existe el código de Pais ingresado","")):
        next();
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

       /*== Condiciones de ingreso de datos para alta de Ciudades ===*/
       dataValidateInsertCity: async (req, res, next) => {

        const city_name = req.body.city_name;
        const id = req.params.id.toUpperCase();
        const getCityAllData = await regionsQueries.getAllCities()
        const countryId = await regionsQueries.getAllCountries()
        const findName = getCityAllData.find(name => name.city_name == city_name);
        const findCountry = countryId.find(r => r.id == id);

        id.length !== 3 ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación","No existe el Pais asociado a la Región")):

        !findCountry ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación","El Pais no existe")):
        
        findName !== undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación","El Nombre de la Ciudad ya se encuentra registrado")):
        
        (req.body['city_name'].length === 0||req.params['id'].length === 0) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación.", "Debe ingresar todos los datos")):
        
        (req.body['city_name'] === " "||req.params['id'] === " ") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", "No puede insertar un caracter vacío")):       
        
        next();
    },

    /*== Condiciones de ingreso de datos para actualización de Paises ===*/
    dataValidateUpdateCountry: async (req, res, next) => {
        const {country_name,region_id } = req.body;
        const id = req.params.id;
        const countryData = await regionsQueries.getAllCountries(); 
        const findId = countryData.map(co => co.id).find(coid => coid == id);
        (typeof id !== "string" || typeof(req.body['country_name']) !== "string") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Alguno de los formatos requeridos para los datos ingresados no es válido`)):

        (id === " "||  req.body['country_name'] === " ") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `No puede insertar caracter vacio`)):       

        (id.length === 0|| req.body['country_name'].length === 0) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Debe ingresar todos los datos`)):

        id.length !== 3 ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `Los Id de los paises deben ser de 3 caracteres`)):

        findId === undefined ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", `El Id del Pais ${id} no existe`)):

        next();
    },


    /*== Condiciones de ingreso de datos para actualización de Ciudades ===*/
    dataValidateUpdateCity: async (req, res, next) => {
        const {city_name} = req.body;
        const id = parseInt(req.params.id);

        (id === " "||  req.body['city_name'] === " ") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación,No puede insertar un caracter vacío", "")):       

        (req.body['city_name'].length === 0 ) ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Debe ingresar todos los datos", "")):

        (typeof(id) !== "number" || typeof(req.body['city_name']) !== "string") ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Alguno de los formatos requeridos para los datos ingresados no es válido", "")):
        next();
    },
    

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
    },

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
    },

};

module.exports = {regionsMiddlewares};