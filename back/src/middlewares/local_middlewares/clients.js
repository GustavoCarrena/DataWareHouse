const Response = require('../../../classes/response');
const {contactChannelQueries, clientsQueries} = require('../../a_model/clients');
const {employeesMiddlewares} = require('../../middlewares/local_middlewares/employees');

const clientsMiddlewares = {
    //Validaciones para alta de canal
    dataValidateInsertChannel: async (req, res, next) => {
        
        const channel = req.body.channel_description; 
        const alphanumericValidation = /[A-Za-z0-9]/i;
        const channelyDb = await contactChannelQueries.getChannels();
        const channelValidation = channelyDb.filter(ch => ch.channel_description === channel);

        typeof channel !== 'string' || alphanumericValidation.test(channel) === false ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de nombre del canal debe ser alfanmerico y no puede estar vacío", "")):

        channelValidation.length !== 0 ?  
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El nombre del canal ya existe", channel)):

        next();
    },

    //Validaciones para modificacion canal
    dataValidateInsertChannel: async (req, res, next) => {
        
        const channel = req.body.channel_description; 
        const alphanumericValidation = /[A-Za-z0-9]/i;
        const channelyDb = await contactChannelQueries.getChannels();
        const channelValidation = channelyDb.filter(ch => ch.channel_description === channel);

        typeof channel !== 'string' || alphanumericValidation.test(channel) === false ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de nombre del canal debe ser alfanmerico y no puede estar vacío", "")):

        channelValidation.length !== 0 ?  
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El nombre del canal ya existe", channel)):

        next();
    },

    //Validaciones para baja de canal
    dataValidateInsertChannel: async (req, res, next) => {
    
        const channel = req.body.channel_description; 
        const alphanumericValidation = /[A-Za-z0-9]/i;
        const channelyDb = await contactChannelQueries.getChannels();
        const channelValidation = channelyDb.filter(ch => ch.channel_description === channel);

        typeof channel !== 'string' || alphanumericValidation.test(channel) === false ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de nombre del canal debe ser alfanmerico y no puede estar vacío", "")):

        channelValidation.length !== 0 ?  
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El nombre del canal ya existe", channel)):

        next();
        },

};

module.exports = {clientsMiddlewares};