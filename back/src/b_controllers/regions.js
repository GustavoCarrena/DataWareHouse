const {regionsQueries} = require('../a_model/regions');
const Response = require ('../../classes/response');

const regions = {
    
    // Toda la información de Regiones, Paises y Ciudades
    getAllData: async (req, res) => {
        try {
            const regionsAndAnotherThings = await regionsQueries.getAllDataRegions();

            const response = regionsAndAnotherThings.reduce((regions, region) => {
                if(!regions.some(r => r.region_id === region.region_id)) {
                    const reCountries = regionsAndAnotherThings.reduce((countries, country) => {
                        if(!countries[country.country_id]){
                            countries[country.country_id] = {
                                country_id: country.country_id,
                                country_name: country.country_name,
                                region_id: country.region_id,
                                cities: regionsAndAnotherThings.filter(city => city.country_id === country.country_id).map(city => ({city_id: city.city_id, city_name: city.city_name}))
                            }
                        }
                        return countries;
                    },{})
                    regions.push({
                        region_id: region.region_id,
                        region_name: region.region_name,
                        countries: Object.values(reCountries).filter(c => c.region_id === region.region_id)
                    });
                }
                return regions;
            },[])
            
            res.status(200).send(new Response(false, 200, "Consulta exitosa", response));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", error.message ));
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
            res.status(200).send(new Response (false,200,"Región Creada Exitosamente",""))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Actualización de datos de Región
    updateRegion: async (req,res) => {
        try {
            const id = parseInt(req.params.id);
            const region_name = req.body.region_name;
            await regionsQueries.updateRegiontById(id, region_name);
            res.status(200).send(new Response (false,200,"Nombre de Región Actualizada Exitosamente",req.body))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Elimnación de Región
    deleteRegion: async (req,res) => {
        try {
            const id = parseInt(req.params.id);
            await regionsQueries.deleteRegionById(id);
            res.status(200).send(new Response (false,200,"Región Eliminada Exitosamente",""))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },


    /*=== PAISES ===*/

    // Obetener datos de paises, seleccionados por región a la cual pertenece
    getCountriesData: async (req, res) => {
        try {
            const region_id = parseInt(req.params.region_id);
            const getData = await regionsQueries.getCountriesByRegion(region_id);
            res.status(200).send(new Response (false,200,"Consulta exitosa",getData))
        } catch (error) {
            res.status(400).send(new Response(true, 500, "No fue posible obtener la consulta", error.message));
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
            const {id, country_name} = req.body;
            const region_id = parseInt(req.params.region_id);
            await regionsQueries.createCountry([id, country_name, region_id]);
            res.status(200).send(new Response (false,200,"País Creado Exitosamente",""))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },


    // Actualización de datos de País
    updateCountry: async (req,res) => {
        const {country_name} = req.body;
        const id = req.params.id;
        try {
            await regionsQueries.updateCountryById(id,country_name);
            res.status(200).send(new Response (false,200,"País Actualizado Exitosamente",""));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Elimnación de País
    deleteCountry: async (req,res) => {
        try {
            const id = req.params.id.toUpperCase();
            await regionsQueries.deleteCountryById(id);
            res.status(200).send(new Response (false,200,"País Eliminado Exitosamente",""))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    /*=== CIUDADES ===*/
    
    // Obetener datos de ciudades, seleccionados por pais a la cual pertenecen
    getCitiesData: async (req, res) => {
        try {
            const country_id = req.params.country_id;
            const getCitiesByCountry = await regionsQueries.getCitiesByCountry(country_id);
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getCitiesByCountry));
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
            const id = req.params.id.toUpperCase();
            await regionsQueries.createCity([city_name, id]);
            res.status(200).send(new Response (false,200,"Ciudad Creada Exitosamente",""))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Actualización de datos de Ciudad
    updateCity: async (req,res) => {
        const {city_name} = req.body;
        const id = parseInt(req.params.id);
        try {
            await regionsQueries.updateCityById(id,city_name);
            res.status(200).send(new Response (false,200,"Ciudad Actualizada Exitosamente",""))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Eliminación de Ciudad
    deleteCity: async (req,res) => {
        try {
            const id = parseInt(req.params.id);
            await regionsQueries.deleteCityById(id);
            res.status(200).send(new Response (false,200,"Ciudad Eliminada Exitosamente",req.body.id))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

}

module.exports = {regions};