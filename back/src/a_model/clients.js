const sequelize = require('../../database/db_conection');

const clientsQueries = {

    // Consulta de vista de contactos
    getClientsView: () => {
        return sequelize.query(
            `SELECT  cl.id AS client_id,cl.firstname, cl.lastname,concat(cl.firstname,' ' ,cl.lastname) AS fullname,cl.email,co.id AS country_id,co.country_name,re.region_name,
            com.id AS company_id,com.company_name,ci.id AS city_id ,cl.position, por.id AS porposal_id ,por.porposal_description AS porposal_description,cl.clientAddress
            ,clcon.whatsapp_account,clcon.whatsapp_preference,clcon.instagram_account, clcon.instagram_preference, re.id AS region_id
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
            LEFT JOIN client_contact clcon
            ON (cl.id = clcon.client_id)`, {
                type: sequelize.QueryTypes.SELECT
            });
    },


    //Alta de cliente - tabla clients
    createClient: (firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id) => {
        return sequelize.query(`
        INSERT INTO clients (firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id) 
            VALUES(?,?,?,?,?,?,?,?)`, {
            type: sequelize.QueryTypes.INSERT,
            replacements: [firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id]
        });
    },

    //Alta de cliente - tabla client_conctact
    createContact: (client_id, whatsapp_account, whatsapp_preference, instagram_account, instagram_preference) => {
        return sequelize.query(`
        INSERT INTO client_contact (client_id, whatsapp_account, whatsapp_preference,instagram_account,instagram_preference) 
            VALUES(?,?,?,?,?)`, {
            type: sequelize.QueryTypes.INSERT,
            replacements: [client_id, whatsapp_account, whatsapp_preference, instagram_account, instagram_preference]
        });
    },

    //Obtener ultimo id insertado
    lastInsertId: () => {
        return sequelize.query('SELECT last_insert_id() FROM clients', {
            type: sequelize.QueryTypes.SELECT,
        });
    },

    //Obtener lista de id y descripción de interes en las propuestas de contacto
    getPorposalInterestData: (id) => {
        return sequelize.query(`SELECT id AS porposal_id, porposal_description FROM porposal_interest`, {
            type: sequelize.QueryTypes.SELECT,

        });
    },

    //Vista para editar datos
    getUpdateClientsView: (id) => {
        return sequelize.query(
            `SELECT  cl.firstname, cl.lastname, cl.position, cl.email, com.company_name, 
            re.region_name, co.country_name, ci.city_name, cl.clientAddress, por.porposal_description, 
            clcon.whatsapp_account, clcon.whatsapp_preference, 
            clcon.instagram_account, clcon.instagram_preference
            FROM clients cl
            LEFT JOIN companies com
            ON (com.id = cl.company_id)
            LEFT JOIN cities ci
            ON (ci.id = cl.city_id)
            LEFT JOIN countries co
            ON (co.id = ci.country_id)
            LEFT JOIN regions re
            ON(re.id = co.region_id)
            LEFT JOIN porposal_interest por
            ON(por.id = cl.porposal_id)
            LEFT JOIN client_contact clcon
            ON(clcon.client_id = cl.id)
            WHERE cl.id = ?`, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [id]
            });
    },

    //Lista datos de los clientes (para validaciones middlewares)
    getClientsIdEmail: () => {
        return sequelize.query(
            `SELECT id,email FROM clients ORDER BY id`, {
                type: sequelize.QueryTypes.SELECT
            });
    },

    // Actualizar datos del cliente (tabla clients)
    updateClientDb: (firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id, id) => {
        return sequelize.query(
            `UPDATE clients SET firstname = ?, lastname = ?, position = ?,email = ?, company_id = ?, city_id = ?, clientAddress = ?, porposal_id = ?
        WHERE id = ?`, {
                type: sequelize.QueryTypes.PUT,
                replacements: [firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id, id]
            })
    },

    // Actualizar datos del cliente (tabla client_contact)
    updateClientContactDb: (whatsapp_account, whatsapp_preference, instagram_account, instagram_preference, client_id) => {
        return sequelize.query(
            `UPDATE client_contact SET  whatsapp_account = ?, whatsapp_preference = ?, instagram_account = ?, instagram_preference = ?
        WHERE client_id = ?    `, {
                type: sequelize.QueryTypes.PUT,
                replacements: [whatsapp_account, whatsapp_preference, instagram_account, instagram_preference, client_id]
            });
    },

    //Elminar cliente por Id
    deleteClientById: (id) => {
        return sequelize.query(`DELETE FROM clients WHERE id = ?`, {
            type: sequelize.QueryTypes.DELETE,
            replacements: [id]
        });
    },





};


module.exports = {
    clientsQueries
}