const Response = require('../../../classes/response');
const {contactChannelQueries, clientsQueries} = require('../../a_model/clients');
const {employeesMiddlewares} = require('../../middlewares/local_middlewares/employees');

const clientsMiddlewares = {
    // //Validaciones para alta de canal
    // dataValidateInsertChannel: async (req, res, next) => {
        
    //     const channel = req.body.channel_description; 
    //     const alphanumericValidation = /[A-Za-z0-9]/i;
    //     const channelyDb = await contactChannelQueries.getChannels();
    //     const channelValidation = channelyDb.filter(ch => ch.channel_description === channel);

    //     typeof channel !== 'string' || alphanumericValidation.test(channel) === false ?
    //     res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de nombre del canal debe ser alfanmerico y no puede estar vacío", "")):

    //     channelValidation.length !== 0 ?  
    //     res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El nombre del canal ya existe", channel)):

    //     next();
    // },

    // //Validaciones para modificacion canal
    // dataValidateUpdateChannel: async (req, res, next) => {
        
    //     const channelId = req.body.id;
    //     const channelDescription = req.body.channel_description; 
    //     const numericValidation =  /[0-9]/i;
    //     const alphanumericValidation = /[A-Za-z0-9]/i;
    //     const channelyDb = await contactChannelQueries.getChannels();
    //     const channelIdValidation = channelyDb.filter(chid => chid.id === req.body.id);

    //     console.log('numericValidation==>', numericValidation.test(channelId));

    //     typeof channelId !== 'number' || numericValidation.test(channelId) === false ?
    //     res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato del Id del canal debe ser numérico y no puede estar vacío", "")):

    //     typeof channelDescription !== 'string' || alphanumericValidation.test(channelDescription) === false ?
    //     res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato del nombre del canal debe ser alfanumérico y no puede estar vacío", "")):

    //     channelIdValidation.length === 0 ?  
    //     res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id de canal no existe", req.body.id)):

    //     next();
    // },

    // //Validaciones para baja de canal
    // dataValidateDeleteChannel: async (req, res, next) => {
    
    //     const channelId = req.body.id;
    //     const numericValidation =  /[0-9]/i;
    //     const channelyDb = await contactChannelQueries.getChannels();
    //     const channelIdValidation = channelyDb.filter(chid => chid.id === req.body.id);

    //     console.log('numericValidation==>', numericValidation.test(channelId));

    //     typeof channelId !== 'number' || numericValidation.test(channelId) === false ?
    //     res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato del Id del canal debe ser numérico y no puede estar vacío", "")):

    //     channelIdValidation.length === 0 ?  
    //     res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id de canal no existe", req.body.id)):

    //     next();
    //     },

            //Validaciones para alta de cliente
    dataValidateCreateClient: async (req, res, next) => {
    
    const {firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id, whatsapp_channel, whatsapp_account, whatsapp_preference, instagram_channel, instagram_account, instagram_preference} = req.body;
    const numericValidation =  /[0-9]/i;
    const alphanumericValidation = /[A-Za-z0-9]/i;
    const alphabeticValidation = /[A-Za-z]/i; 
    const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    alphabeticValidation.test(firstname) !== true || alphabeticValidation.test(lastname) !== true || alphabeticValidation.test(position) !== true ? 
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. firstname, lastname y position deben ser alfabeticos y no puede estar vacío", "")):
    
    numericValidation.test(company_id) !== true || typeof company_id !== 'number'|| numericValidation.test(city_id) !==true || typeof city_id !== 'number' || numericValidation.test(porposal_id) !== true || typeof porposal_id !== 'number' ? 
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. company_id, city_id y porposal_id deben ser numericos y no puede estar vacío", "")):
    
    emailValidation.test(email) !== true ? 
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Formato de email inválido y no puede estar vacío", "")):

    alphanumericValidation.test(clientAddress) !== true ? 
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. clientAddress debe ser alfanumerico o alfabetico y no puede estar vacío", "")):

    alphabeticValidation.test(whatsapp_channel) !== true || whatsapp_channel !== 'Whatsapp' || alphabeticValidation.test(instagram_channel) !== true || instagram_channel !== 'Instagram' ?
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Los canales no pueden estar vacíos", "")):

    whatsapp_preference !== "Canal Favorito" && whatsapp_preference !== 'Sin Preferencia' && whatsapp_preference !== 'No Molestar' && whatsapp_preference !== '' && whatsapp_preference !== ' ' &&
    instagram_preference !== "Canal Favorito" && instagram_preference !== 'Sin Preferencia' && instagram_preference !== 'No Molestar' && instagram_preference !== '' && instagram_preference !== ' ' ?
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Las preferencias de los canales son Canal Favorito, Sin Preferencia, No Molestar o no debe contener datos", "")):

    next();
    },

};

module.exports = {clientsMiddlewares};