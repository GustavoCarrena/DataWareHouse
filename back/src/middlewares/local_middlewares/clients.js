const Response = require('../../../classes/response');
const {clientsQueries} = require('../../a_model/clients');
const {companiesQueries} = require('../../a_model/companies');
const {regionsQueries} = require('../../a_model/regions');

const clientsMiddlewares = {

    //Validaciones para alta de cliente
    dataValidateCreateClient: async (req, res, next) => {
    
    const {firstname, lastname, position, email, clientAddress, whatsapp_channel, whatsapp_account, whatsapp_preference, instagram_channel, instagram_account, instagram_preference} = req.body;
    const company_id= parseInt (req.params.company_id);
    const city_id = parseInt (req.params.city_id);
    const porposal_id = parseInt (req.params.porposal_id);
    const data = await clientsQueries.getClientsIdEmail();
    const emailcheck = data.some(e => e.email.includes(email));
    const companyCheck = (await companiesQueries.getAllDataCompanies()).find(e => e.id === company_id)
    const cityCheck = (await regionsQueries.getAllCities()).find(e => e.id === city_id)
    const porposalCheck = (await clientsQueries.getPorposalInterestData()).find(e => e.id === porposal_id)
    const numericValidation =  /[0-9]/i;
    const alphanumericValidation = /[A-Za-z0-9]/i;
    const alphabeticValidation = /[A-Za-z]/i; 
    const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    emailcheck === true ?
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El email ya se encuentra registrado para otro usuario", "")):
    
    companyCheck === undefined ?
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id de la compañía no existe", "")):

    cityCheck === undefined ?
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id de la ciudad no existe", "")):

    porposalCheck === undefined ?
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id de interes en propuestas no existe", "")):
    
    alphabeticValidation.test(firstname) !== true || alphabeticValidation.test(lastname) !== true || alphabeticValidation.test(position) !== true ? 
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. firstname, lastname y position deben ser alfabeticos y no puede estar vacío", "")):
    
    numericValidation.test(company_id) !== true || typeof company_id !== 'number'|| numericValidation.test(city_id) !==true || typeof city_id !== 'number' || numericValidation.test(porposal_id) !== true || typeof porposal_id !== 'number' ? 
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. company_id, city_id y porposal_id deben ser numericos y no puede estar vacío", "")):
    
    emailValidation.test(email) !== true ? 
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Formato de email inválido y no puede estar vacío", "")):

    alphanumericValidation.test(clientAddress) !== true ? 
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. clientAddress debe ser alfanumerico o alfabetico y no puede estar vacío", "")):

    whatsapp_preference !== "Canal Favorito" && whatsapp_preference !== 'Sin Preferencia' && whatsapp_preference !== 'No Molestar' && whatsapp_preference !== '' && whatsapp_preference !== ' ' &&
    instagram_preference !== "Canal Favorito" && instagram_preference !== 'Sin Preferencia' && instagram_preference !== 'No Molestar' && instagram_preference !== '' && instagram_preference !== ' ' ?
    res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Las preferencias de los canales son Canal Favorito, Sin Preferencia, No Molestar o no debe contener datos", "")):

    next();
    },//ok!!!!


    //Validaciones para alta de cliente
    dataValidateUpdateClient: async (req, res, next) => {
    
        const {firstname, lastname, position, email, clientAddress, whatsapp_preference,instagram_preference} = req.body;
        const company_id= parseInt (req.params.company_id);
        const city_id = parseInt (req.params.city_id);
        const porposal_id = parseInt (req.params.porposal_id);
        const companyCheck = (await companiesQueries.getAllDataCompanies()).find(e => e.id === company_id)
        const cityCheck = (await regionsQueries.getAllCities()).find(e => e.id === city_id)
        const porposalCheck = (await clientsQueries.getPorposalInterestData()).find(e => e.id === porposal_id)
        const numericValidation =  /[0-9]/i;
        const alphanumericValidation = /[A-Za-z0-9]/i;
        const alphabeticValidation = /[A-Za-z]/i; 
        const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
        companyCheck === undefined ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id de la compañía no existe", "")):
    
        cityCheck === undefined ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id de la ciudad no existe", "")):
    
        porposalCheck === undefined ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El id de interes en propuestas no existe", "")):
        
        alphabeticValidation.test(firstname) !== true || alphabeticValidation.test(lastname) !== true || alphabeticValidation.test(position) !== true ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. firstname, lastname y position deben ser alfabeticos y no puede estar vacío", "")):
        
        numericValidation.test(company_id) !== true || typeof company_id !== 'number'|| numericValidation.test(city_id) !==true || typeof city_id !== 'number' || numericValidation.test(porposal_id) !== true || typeof porposal_id !== 'number' ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. company_id, city_id y porposal_id deben ser numericos y no puede estar vacío", "")):
        
        emailValidation.test(email) !== true ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Formato de email inválido y no puede estar vacío", "")):
    
        alphanumericValidation.test(clientAddress) !== true ? 
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. clientAddress debe ser alfanumerico o alfabetico y no puede estar vacío", "")):
    
        whatsapp_preference !== "Canal Favorito" && whatsapp_preference !== 'Sin Preferencia' && whatsapp_preference !== 'No Molestar' && whatsapp_preference !== '' && whatsapp_preference !== ' ' &&
        instagram_preference !== "Canal Favorito" && instagram_preference !== 'Sin Preferencia' && instagram_preference !== 'No Molestar' && instagram_preference !== '' && instagram_preference !== ' ' ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Las preferencias de los canales son Canal Favorito, Sin Preferencia, No Molestar o no debe contener datos", "")):
    
        next();
        },//ok!!!!
    
    //validacion que exista id de cliente para actualizacion y eliminacion de datos
    validateClientId: async (req, res, next) => {
        const id = parseInt(req.params.id);
        (await clientsQueries.getClientsIdEmail()).find(e => e.id === id) === undefined  ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. No existe el Id de Cliente", "")):
        next();
        },//ok!!

    

};

module.exports = {clientsMiddlewares};