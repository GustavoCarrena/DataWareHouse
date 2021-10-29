const sequelize = require('../../database/db_conection');

const regionsQueries = {

    /*=== Retorna toda la información de regiones, paises y ciudades, asociados ===*/
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

    /*=== Consulta de id y de nombre de regiones ===*/
    getRegions: () => {
        return sequelize.query(
            'SELECT * FROM regions;', 
            {type: sequelize.QueryTypes.SELECT});
    },

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

    createRegion: (regionData) => {
        return sequelize.query('INSERT INTO regions VALUES(region_name)'),{
            type: sequelize.QueryTypes.INSERT,
            replacements: [regionData]
        }
    },

}; //fin regions



module.exports = {regionsQueries}