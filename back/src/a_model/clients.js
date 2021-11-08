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
    // getContactChannels: () => {
    //     return sequelize.query(
    //         'SELECT * FROM contact_channel;', 
    //         {type: sequelize.QueryTypes.SELECT});
    // },


    //Consulta de los canales de contacto de cada cliente (contact_channel)

};



const clientsQueries = {
//incluir la tabla contact_channel (ademas de las de clientes)

};


module.exports = {contactChannelQueries, clientsQueries}