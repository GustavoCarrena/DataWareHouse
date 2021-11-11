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

    //Consulta de vista de contactos
    // getClientsView: () => {
    //     return sequelize.query(
    //         `SELECT (cl.id) AS client_id, concat(cl.firstname,' ' ,cl.lastname) AS fullname,cl.email,co.country_name,re.region_name,
    //         com.company_name, cl.position, group_concat(ch.channel_description,'-',coch.preference) AS Canal_Favorito,coch.account, coch.preference ,cl.porposal_interest
    //         FROM clients cl
    //         INNER JOIN cities ci
    //         ON (ci.id = cl.city_id)
    //         INNER JOIN countries co
    //         ON (co.id = ci.country_id)
    //         INNER JOIN regions re
    //         ON(re.id = co.region_id)
    //         INNER JOIN companies com
    //         ON(com.id = cl.company_id)
    //         INNER JOIN contact_channel coch
    //         ON (coch.client_id = cl.id)
    //         INNER JOIN channel ch
    //         ON (ch.id = coch.channel_id)
    //         GROUP BY cl.id`, 
    //         {type: sequelize.QueryTypes.SELECT});
    // },

    getClientsView: () => {
        return sequelize.query(
            `SELECT (cl.id) AS client_id, concat(cl.firstname,' ' ,cl.lastname) AS fullname,cl.email,co.country_name,re.region_name,
            com.company_name, cl.position, ch.channel_description, coch.preference AS preferencia_canal,coch.account, cl.porposal_interest
            FROM clients cl
            INNER JOIN cities ci
            ON (ci.id = cl.city_id)
            INNER JOIN countries co
            ON (co.id = ci.country_id)
            INNER JOIN regions re
            ON(re.id = co.region_id)
            INNER JOIN companies com
            ON(com.id = cl.company_id)
            INNER JOIN contact_channel coch
            ON (coch.client_id = cl.id)
            INNER JOIN channel ch
            ON (ch.id = coch.channel_id)
            GROUP BY cl.id`, 
            {type: sequelize.QueryTypes.SELECT});
    },


    getFavoriteChannelByClient: () => {
        return sequelize.query(
            `
            SELECT(cl.id) AS client_id, ch.channel_description AS "Canal Preferido"
            FROM clients cl
            INNER JOIN contact_channel coch
            ON(cl.id = coch.client_id)
            INNER JOIN channel ch
            ON(ch.id = coch.channel_id)
            
            GROUP BY cl.id`,
            {
                type: sequelize.QueryTypes.SELECT,
                
            }
        );
    },
    

    getAllDataClient: () => {
        return sequelize.query(
            `
            SELECT (cl.id) AS client_id, concat(cl.firstname,' ' ,cl.lastname) AS fullname,cl.email,co.country_name,re.region_name,
            com.company_name, cl.position, ch.channel_description AS Canal ,coch.account, coch.preference ,cl.porposal_interest
            FROM clients cl
            INNER JOIN cities ci
            ON (ci.id = cl.city_id)
            INNER JOIN countries co
            ON (co.id = ci.country_id)
            INNER JOIN regions re
            ON(re.id = co.region_id)
            INNER JOIN companies com
            ON(com.id = cl.company_id)
            INNER JOIN contact_channel coch
            ON (coch.client_id = cl.id)
            INNER JOIN channel ch
            ON (ch.id = coch.channel_id)`,
            {
                type: sequelize.QueryTypes.SELECT,
                
            }
        );
    },


    /*Agregar una vista para ver canales (linkedin, etc). Si tiene el no molestar ver en 
    controllers, que lo reemplace por vacío o algo, porque desde sql si le saco no molestar y es el unico que
    tiene, entonces no me muestra el registro.. ver como solucionarlo sin el sql (con Js)
    
    OPCION: extraer de la funcion "getClientsView" 'Canal Preferido'.. con una insttrucicon SQL cruzar canal preferido con el no molestar
    y ahi una funcion Js con que si aparece no molestar, devuelca el campo "Canal Preferido" en blanco
    
    PREFERENCE POR client ID (TABLA CONTACT_CHANNEL)

    */
    
    


};


module.exports = {contactChannelQueries, clientsQueries}