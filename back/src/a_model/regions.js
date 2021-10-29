const sequelize = require('../../database/db_conection');

const regionsQueries = {
    
    /*=== REGIONES ===*/

    //Retorna toda la información de regiones, paises y ciudades, asociados
    getAllDataRegions: () => {
        return sequelize.query(
            `
            SELECT r.id AS region_id, r.region_name, co.id AS country_id, co.country_name, ci.id city_id, ci.city_name
            FROM regions r
            INNER JOIN countries co
            ON (r.id = co.region_id)
            INNER JOIN cities ci
            ON (ci.country_id = co.id)
            GROUP BY ci.id
            ORDER BY r.id           
            `, 
            {type: sequelize.QueryTypes.SELECT});
    },

    //Consulta de id y de nombre de regiones
    getRegions: () => {
        return sequelize.query(
            'SELECT * FROM regions;', 
            {type: sequelize.QueryTypes.SELECT});
    },

    getRegionName: () => {
        return sequelize.query(
            'SELECT region_name FROM regions;', 
            {type: sequelize.QueryTypes.SELECT});
    },

    //Alta de Región
    createRegion: (regionData) => {
        return sequelize.query('INSERT INTO regions (region_name) VALUES(?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: [regionData]
        });
    },

    /*=== PAISES ===*/

    /*=== Consulta de paises por region ===*/
    getCountriesByRegion: (regionid) => {
        return sequelize.query(
            `SELECT  co.id AS country_id, co.country_name AS country_name,r.id AS region_id, r.region_name AS region_name
            FROM regions r
            INNER JOIN countries co
            ON (r.id = co.region_id)
            WHERE r.id = ? `, 
            {
                type: sequelize.QueryTypes.SELECT,
                replacements: [regionid]
            });
    },

    getAllCountries: () => {
        return sequelize.query(
            `SELECT  * FROM countries`, 
            {type: sequelize.QueryTypes.SELECT});
    },

    //Alta de País
    createCountry: (countryData) => {
        return sequelize.query('INSERT INTO countries (id,country_name, region_id) VALUES(?,?,?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: countryData
        });
    },

    /*=== CIUDADES ===*/
    
    /*=== Consulta de ciudades por paises ===*/
    getCitiesByCountry: (id) => {
        return sequelize.query(
            `SELECT ci.id AS city_id , ci.city_name, co.id AS country_id , co.country_name, r.id AS region_id, r.region_name
            FROM regions r
            INNER JOIN countries co
            ON (r.id = co.region_id)
            INNER JOIN cities ci
            ON ( co.id  = ci.country_id)
            WHERE co.id = ?`, 
            {
            type: sequelize.QueryTypes.SELECT,
            replacements: [id]
            });
    },

}; //fin regions



module.exports = {regionsQueries}