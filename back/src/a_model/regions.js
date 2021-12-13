const sequelize = require('../../database/db_conection');

const regionsQueries = {

    /*=== REGIONES ===*/

    //Retorna toda la información de regiones, paises y ciudades, asociados
    getAllDataRegions: () => {
        return sequelize.query(
            `
            SELECT r.id AS region_id, r.region_name, co.id AS country_id, co.country_name, ci.id city_id, ci.city_name
            FROM regions r
            LEFT JOIN countries co
            ON (r.id = co.region_id)
            LEFT JOIN cities ci
            ON (ci.country_id = co.id)
            ORDER BY r.region_name
            `, {
                type: sequelize.QueryTypes.SELECT
            });


    },

    //Alta de Región
    createRegion: (regionData) => {
        return sequelize.query('INSERT INTO regions (region_name) VALUES(?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: [regionData]
        });
    },

    //Consulta de id y de nombre de regiones
    getRegions: () => {
        return sequelize.query(
            'SELECT id AS region_id, region_name FROM regions;', {
                type: sequelize.QueryTypes.SELECT
            });
    },

    getRegionName: () => {
        return sequelize.query(
            'SELECT region_name FROM regions;', {
                type: sequelize.QueryTypes.SELECT
            });
    },

    //Editar Región
    updateRegiontById: (region_name, id) => {
        return sequelize.query(`UPDATE regions SET region_name = ?  WHERE id = ?`, {
            type: sequelize.QueryTypes.PUT,
            replacements: [id, region_name]
        });
    }, 

    //Elminar Región
    deleteRegionById: (id) => {
        return sequelize.query(`DELETE FROM regions WHERE id = ?`, {
            type: sequelize.QueryTypes.PUT,
            replacements: [id]
        });
    },

    /*=== PAISES ===*/

    /*=== Consulta de paises por region ===*/
    getCountriesByRegion: (region_id) => {
        return sequelize.query(
            `SELECT id AS country_id, country_name FROM countries WHERE region_id = ? `, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [region_id]
            });
    },

    getAllCountries: () => {
        return sequelize.query(
            `SELECT  * FROM countries`, {
                type: sequelize.QueryTypes.SELECT
            });
    },

    //Alta de País
    createCountry: (countryData) => {
        return sequelize.query('INSERT INTO countries (id,country_name, region_id) VALUES(?,?,?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: countryData
        });
    },

    // //Editar País
    updateCountryById: (id, country_name) => {
        return sequelize.query('UPDATE countries SET country_name = ? WHERE id = ? ', {
            type: sequelize.QueryTypes.PUT,
            replacements: [country_name, id]
        });
    },

    //Elminar País
    deleteCountryById: (id) => {
        return sequelize.query(`DELETE FROM countries WHERE id = ?`, {
            type: sequelize.QueryTypes.PUT,
            replacements: [id]
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
            WHERE co.id = ?`, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [id]
            });
    },

    getAllCities: () => {
        return sequelize.query(
            `SELECT * FROM cities`, {
                type: sequelize.QueryTypes.SELECT
            });
    },

    getAllCitiesData: () => {
        return sequelize.query(
            `  SELECT ci.id AS city_id, ci.city_name, ci.country_id, co.country_name, re.id AS region_id, re.region_name
            FROM cities ci
            LEFT JOIN countries co
            ON (ci.country_id = co.id)
            LEFT JOIN regions re
            ON (co.region_id = re.id)
            ORDER BY ci.id `, {
                type: sequelize.QueryTypes.SELECT
            });
    },


    createCity: (countryData) => {
        return sequelize.query('INSERT INTO cities (city_name, country_id) VALUES(?,?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: countryData
        });
    },

    //Editar Ciudad
    updateCityById: (id, city_name) => {
        return sequelize.query('UPDATE cities SET city_name = ? WHERE id = ? ', {
            type: sequelize.QueryTypes.PUT,
            replacements: [city_name, id]
        });
    },

    //Elminar Ciudad
    deleteCityById: (id) => {
        return sequelize.query(`DELETE FROM cities WHERE id = ?`, {
            type: sequelize.QueryTypes.DELETE,
            replacements: [id]
        });
    },

};

module.exports = {
    regionsQueries
}