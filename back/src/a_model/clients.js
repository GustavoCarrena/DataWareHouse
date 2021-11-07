const sequelize = require('../../database/db_conection');

const contactChannelQueries = {

    //Lista de los canales de contacto
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

};



const clientsQueries = {
//incluir la tabla contact_channel (ademas de las de clientes)

};


module.exports = {contactChannelQueries, clientsQueries}