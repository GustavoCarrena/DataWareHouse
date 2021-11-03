const sequelize = require('../../database/db_conection');

const companiesQueries = {

     //Retorna toda la información de la compañías
     getAllDataCompanies: () => {
        return sequelize.query(
            `
            SELECT co.id AS company_id, co.company_name, co.company_address, co.email AS company_email, co.phone AS company_phone, 
			co.city_id, ci.city_name, coun.id AS country_id, coun.country_name, r.id AS region_id, r.region_name
            FROM companies co
            INNER JOIN cities ci
            ON (co.city_id = ci.id)
            INNER JOIN clients cli
            ON (co.id = cli.company_id)
            INNER JOIN countries coun
            ON (ci.country_id = coun.id)
            INNER JOIN regions r
            ON (coun.region_id = r.id)
            GROUP BY co.id          
            `, 
            {type: sequelize.QueryTypes.SELECT});
    },





};

module.exports = {companiesQueries}