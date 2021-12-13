const sequelize = require('../../database/db_conection');

const companiesQueries = {

    //  Retorna toda la información de la compañías
    
    getAllDataCompanies: () => {
        return sequelize.query(
            `
            SELECT co.id , co.company_name, co.company_address, co.email AS company_email , co.phone AS company_phone, 
            ci.id AS city_id, ci.city_name,
            cy.id AS country_id, cy.country_name,
            re.id AS region_id, re.region_name
            FROM companies co
            LEFT JOIN cities ci
            ON (co.city_id = ci.id)
            LEFT JOIN countries cy
            ON (ci.country_id = cy.id)
            LEFT JOIN regions re
            ON (cy.region_id = re.id)         
            `, 
            {type: sequelize.QueryTypes.SELECT});
    },

    //Alta de compañia
    createCompany: (id,company_name, city_id, company_address, email, phone) => {
        return sequelize.query('INSERT INTO companies (company_name, city_id, company_address, email, phone) VALUES(?,?,?,?,?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: [id,company_name, city_id, company_address, email, phone]
        });
    },

    //Editar Compañia
    updateCompany : (id,company_name,city_id, company_address, email, phone) => {
        return sequelize.query(
        `UPDATE companies 
        SET company_name = ?, city_id = ?, company_address = ?, email = ?, phone = ?
        WHERE id = ? `,
        {
            type: sequelize.QueryTypes.PUT,
            replacements: [company_name,city_id, company_address, email, phone, id]
        });
    },

        //Elminar Compañia
        deleteCompanyById : (id ) => {
            return sequelize.query(`DELETE FROM companies WHERE id = ?`, {
                type: sequelize.QueryTypes.DELETE,
                replacements: [id]
            });
        },
};

module.exports = {companiesQueries}