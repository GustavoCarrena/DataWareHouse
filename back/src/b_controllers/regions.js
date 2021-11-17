const {regionsQueries} = require('../a_model/regions');
const Response = require ('../../classes/response');

const regions = {
    
    // Toda la información de Regiones, Paises y Ciudades
    getAllData: async (req, res) => {
        try {
            const getData = await regionsQueries.getAllDataRegions();
            console.log(getData);
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", ""));
        }
    },

    /*=== REGIONES ===*/
    
    //Obtener Id y Descripción de las Regiones datos de paises o ciudades
    getRegionsData: async (req, res) => {
        try {
            const getData = await regionsQueries.getRegions();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", ""));
        }
    },

    // Creación de Región
    addRegion: async (req,res) => {
        try {
            const {region_name} = req.body;
            const createRegion = await regionsQueries.createRegion(region_name);
            const regionId =  createRegion[0]
            res.status(200).send(new Response (false,200,"Región Creada Exitosamente",{id:regionId, region_name:region_name}))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Actualización de datos de Región
    updateRegion: async (req,res) => {
        try {
            const {id,region_name} = req.body;
            await regionsQueries.updateRegiontById(id, region_name);
            res.status(200).send(new Response (false,200,"Nombre de Región Actualizada Exitosamente",req.body))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Elimnación de Región
    deleteRegion: async (req,res) => {
        try {
            const {id} = req.body;
            await regionsQueries.deleteRegionById(id);
            res.status(200).send(new Response (false,200,"Región Eliminada Exitosamente",req.body.id))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },


    /*=== PAISES ===*/

    // Obetener datos de paises, seleccionados por región a la cual pertenece
    getCountriesData: async (req, res) => {
        try {
            const {region_id} = req.body;
            const getData = await regionsQueries.getCountriesByRegion(region_id);
            const region = getData.find(c => {return c.region_id === region_id});
            region ? res.status(200).send(new Response(false, 200, "Consulta exitosa", getData))
            : res.status(400).send(new Response(true, 400, "No existe el código de Región ingresado", `Código ingresado: ${region_id}`));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", ""));
        }
    },

    // Lista de todos los Paises con su Región identificada
    getAllCountryData: async (req, res) => {
        try {
            const getData = await regionsQueries.getAllCountries();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", ""));
        }
    },

    //Creación de País
    addCountry: async (req,res) => {
        try {
            const {id, country_name, region_id} = req.body;
            await regionsQueries.createCountry([id, country_name, region_id]);
            res.status(200).send(new Response (false,200,"País Creado Exitosamente",{id, country_name, region_id}))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },



    // Actualización de datos de País
    updateCountry: async (req,res) => {
        const {id,country_name, region_id} = req.body;
        try {
            await regionsQueries.updateCountryById(id,country_name, region_id);
            res.status(200).send(new Response (false,200,"País Actualizado Exitosamente",{id: req.body.id.toUpperCase(), country_name: req.body.country_name, region_id: req.body.region_id}))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },



        // Elimnación de País
        deleteCountry: async (req,res) => {
            try {
                const {id} = req.body;
                await regionsQueries.deleteCountryById(id);
                res.status(200).send(new Response (false,200,"País Eliminado Exitosamente",req.body.id))
            } catch (error) {
                res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
            }
        },

    /*=== CIUDADES ===*/
    
    // Obetener datos de ciudades, seleccionados por pais a la cual pertenecen
    getCitiesData: async (req, res) => {
        try {
            const {country_id} = req.body;
            const getData = await regionsQueries.getCitiesByCountry(country_id);
            const country = getData.find(c => {return c.country_id === country_id});
            country ? res.status(200).send(new Response(false, 200, "Consulta exitosa", getData))
            : res.status(400).send(new Response(true, 400, "No existe el código de País ingresado", `Código ingresado: ${country_id}`));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", ""));
        }
    },

    // Lista de todos las ciudades con su Pais y Región
    getAllCityData: async (req, res) => {
        try {
            const getData = await regionsQueries.getAllCitiesData();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", ""));
        }
    },

    //Creación de Ciudad
    addCity: async (req,res) => {
        try {
            const city_name = req.body.city_name;
            const country_id = req.body.country_id.toUpperCase();
            const createCity =await regionsQueries.createCity([city_name, country_id]);
            const cityId= createCity[0]
            res.status(200).send(new Response (false,200,"Ciudad Creada Exitosamente",{id: cityId,city_name:city_name, country_id:country_id}))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Actualización de datos de Ciudad
    updateCity: async (req,res) => {
        const {id,city_name} = req.body;
        const country_id = req.body.country_id.toUpperCase()
        try {
            await regionsQueries.updateCityById(id,city_name, country_id);
            res.status(200).send(new Response (false,200,"Ciudad Actualizada Exitosamente",{id: id, city_name: req.body.city_name, country_id: country_id}))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Eliminación de Ciudad
    deleteCity: async (req,res) => {
        try {
            const {id} = req.body;
            await regionsQueries.deleteCityById(id);
            res.status(200).send(new Response (false,200,"Ciudad Eliminada Exitosamente",req.body.id))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

}//fin de regions

module.exports = {regions};