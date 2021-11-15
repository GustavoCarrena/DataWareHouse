const sequelize = require('../../database/db_conection');

const contactChannelQueries = {

    //Lista de los canales
    getChannels: () => {
        return sequelize.query(
            'SELECT * FROM channel;', 
            {type: sequelize.QueryTypes.SELECT});
    },

    //Alta de canal
    createChannel: (channel_description) => {
        return sequelize.query('INSERT INTO channel (channel_description) VALUES(?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: [channel_description]
        });
    },
    //Edición de canal
    updateChannel : (id,channel_description) => {
        return sequelize.query(
        'UPDATE channel SET channel_description = ? WHERE id = ? ',
        {
            type: sequelize.QueryTypes.PUT,
            replacements: [channel_description,id]
        });
    },

    //Elminar canal
    deleteChannelById : (id) => {
        return sequelize.query(`DELETE FROM channel WHERE id = ?`, {
            type: sequelize.QueryTypes.DELETE,
            replacements: [id]
        });
    },

    //Lista de todos los canales de contacto asociados a un cliente (contact_channel)
    getAllContactChannel: () => {
        return sequelize.query(
            `SELECT coch.id AS contact_channelId, coch.channel_id, ch.channel_description, coch.account, coch.preference, coch.client_id
            FROM contact_channel coch
            INNER JOIN channel ch
            ON (coch.channel_id = ch.id)`, 
            {type: sequelize.QueryTypes.SELECT});
    },

    // LIsta de preferencia de contacto por cuenta de contacto de cliente
    getPreferenceAccountById : (id) => {
        return sequelize.query(`SELECT account, preference FROM contact_channel WHERE client_id= ?`, {
            type: sequelize.QueryTypes.SELECT,
            replacements: [id]
        });
    },

};


const clientsQueries = {

    //Consulta de vista de contactos. El resultado muestra solo los canales favoritos
    getClientsView: () => {
        return sequelize.query(
            `SELECT  cl.id AS client_id, concat(cl.firstname,' ' ,cl.lastname) AS fullname,cl.email,co.country_name,re.region_name,
            com.company_name, cl.position, group_concat(ch.channel_description,''SEPARATOR '-') AS canal_preferido, 
            cl.porposal_id
            FROM clients cl
            JOIN cities ci
            ON (ci.id = cl.city_id)
            JOIN countries co
            ON (co.id = ci.country_id)
            JOIN regions re
            ON(re.id = co.region_id)
            JOIN companies com
            ON(com.id = cl.company_id)
            JOIN client_contact coch
            ON (coch.client_id = cl.id)
            LEFT JOIN channel ch
            ON (ch.id = coch.channel_id AND coch.preference_id = 1)
   			GROUP BY cl.id`,
            {type: sequelize.QueryTypes.SELECT});
    },

    //Alta de cliente
    createClient: (firstname, lastname, phone, position, email, adress, city_id, porposal_interest,company_id) => {
        return sequelize.query('INSERT INTO clients (firstname, lastname, phone, position, email, adress, city_id, porposal_interest,company_id) VALUES(?,?,?,?,?,?,?,?,?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: [firstname, lastname, phone, position, email, adress, city_id, porposal_interest,company_id]
        });
    },

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


module.exports = {contactChannelQueries, clientsQueries}