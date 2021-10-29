const {regionsQueries} = require('../a_model/regions');
const Response = require ('../../classes/response');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const JWTKEY = process.env.JWTKEY;

const regions = {
    
    // Toda la información de Regiones, Paises y Ciudades
    getAllDataRegions: async (req, res) => {
        try {
            const getData = await regionsQueries.getAllDataRegions();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", ""));
        }
    },

    /*=== REGIONES ===*/
    
    //Obtener Id y Descripción de las Regiones
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
            await regionsQueries.createRegion(region_name);
            res.status(200).send(new Response (false,200,"Región Creada Exitosamente",region_name))
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
            const city = getData.find(c => {return c.region_id === region_id});
            city ? res.status(200).send(new Response(false, 200, "Consulta exitosa", getData))
            : res.status(400).send(new Response(true, 400, "No existe el código de Región ingresado", `Código ingresado: ${region_id}`));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", ""));
        }
    },

    //Creación de País
    addCountry: async (req,res) => {
        try {
            const {id, country_name, region_id} = req.body;
            const addCountry = await regionsQueries.createCountry([id, country_name, region_id]);
            res.status(200).send(new Response (false,200,"País Creado Exitosamente",addCountry))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    /*=== CIUDADES ===*/

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



}//fin de regions

module.exports = {regions};