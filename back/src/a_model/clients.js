const sequelize = require('../../database/db_conection');

const clientsQueries = {

    //Consulta de vista de contactos
    getClientsView: () => {
        return sequelize.query(
            `SELECT  cl.id AS client_id, concat(cl.firstname,' ' ,cl.lastname) AS fullname,cl.email,co.country_name,re.region_name,
            com.company_name, cl.position, por.porposal_description
            FROM clients cl
            LEFT JOIN cities ci
            ON (ci.id = cl.city_id)
            LEFT JOIN countries co
            ON (co.id = ci.country_id)
            LEFT JOIN regions re
            ON(re.id = co.region_id)
            JOIN companies com
            ON(com.id = cl.company_id)
            LEFT JOIN porposal_interest por
            ON (por.id = cl.porposal_id)
   			GROUP BY cl.id`,
            {type: sequelize.QueryTypes.SELECT});
    },//ok!!!

    //Alta de cliente - tabla clients
    createClient: (firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id) => {
        return sequelize.query(`
        INSERT INTO clients (firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id) 
            VALUES(?,?,?,?,?,?,?,?)`, {
            type: sequelize.QueryTypes.INSERT,
            replacements: [firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id]
        });
    },//ok!!!!

    //Alta de cliente - tabla client_conctact
    createContact: (client_id,whatsapp_channel, whatsapp_account, whatsapp_preference,instagram_channel,instagram_account,instagram_preference) => {
        return sequelize.query(`
        INSERT INTO client_contact (client_id,whatsapp_channel, whatsapp_account, whatsapp_preference,instagram_channel,instagram_account,instagram_preference) 
            VALUES(?,?,?,?,?,?,?)`, {
            type: sequelize.QueryTypes.INSERT,
            replacements: [client_id,whatsapp_channel, whatsapp_account, whatsapp_preference,instagram_channel,instagram_account,instagram_preference]
        });
    },//ok!!!!

    //Obtener ultimo id insertado
    lastInsertId: () => {
        return sequelize.query('SELECT last_insert_id() FROM clients', {
            type: sequelize.QueryTypes.SELECT,
        });
    },//ok!!!!

    //Obtener lista de id y descripción de interes en las propuestas de contacto
    getPorposalInterestData : (id) => {
        return sequelize.query(`SELECT * FROM porposal_interest`, {
            type: sequelize.QueryTypes.SELECT,
            
        });
    },//ok!!!!


    
    
    updateClient : (id,firstname, lastname, phone, position, email, adress, city_id, porposal_interest,company_id) => {
        return sequelize.query(
        `UPDATE clients SET firstname = ?, lastname = ?, phone = ?, position = ?,email = ?, adress = ?, city_id = ?, porposal_interest = ?, company_id = ?
        WHERE id = ?    `,
        {
            type: sequelize.QueryTypes.PUT,
            replacements: [firstname, lastname, phone, position, email, adress, city_id, porposal_interest,company_id, id]
        });
    },

        //Elminar canal
        deleteClientById : (id) => {
            return sequelize.query(`DELETE FROM clients WHERE id = ?`, {
                type: sequelize.QueryTypes.DELETE,
                replacements: [id]
            });
        },


    
    


};


module.exports = {clientsQueries}