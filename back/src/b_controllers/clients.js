const Response = require ('../../classes/response');
const {clientsQueries} = require('../a_model/clients');


const clients = {


    // Alta de cliente
    addClient: async (req,res) => {
        try {
            const {firstname, lastname, position, email, clientAddress,whatsapp_account, whatsapp_preference,instagram_account,instagram_preference} = req.body;
            const company_id= parseInt (req.params.company_id);
            const city_id = parseInt (req.params.city_id);
            const porposal_id = parseInt (req.params.porposal_id);
            await clientsQueries.createClient(firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id);
            const lastInsertId = await clientsQueries.lastInsertId()
            client_id = lastInsertId[0]['last_insert_id()'];
            await clientsQueries.createContact(client_id,whatsapp_account, whatsapp_preference,instagram_account,instagram_preference)             
            res.status(200).send(new Response (false,200,"Cliente Creado Exitosamente",""));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },//ok!!!!

    // Lista de id y descripción de interes en las propuestas de contacto
    getPorposalInterestData: async (req, res) => {
        try {
            const getData = await clientsQueries.getPorposalInterestData();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", error));
        }
    },//ok!!!!!

    // Lista de todos los datos de los clientes
    getClientsView: async (req, res) => {
        try {
            const getData = await clientsQueries.getClientsView();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", error));
        }
    },//ok!!!

    //Obtener vista de datos de contacto para actualizar sus datos
    getUpdateClientsView: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const getData = await clientsQueries.getUpdateClientsView(id);
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", error));
        }
    },//ok!!!

    // Modificar datos de cliente
    updateClientData: async (req,res) => {
        try {
            const {firstname, lastname, position, email, clientAddress, whatsapp_account, whatsapp_preference,instagram_account, instagram_preference } = req.body;
            const company_id = req.params.company_id;
            const city_id = req.params.city_id;
            const porposal_id = req.params.porposal_id;
            let id = req.params.id;
            let client_id = req.params.id; 
            await clientsQueries.updateClientDb(firstname, lastname, position, email, company_id, city_id, clientAddress, porposal_id, id);
            await clientsQueries.updateClientContactDb(whatsapp_account, whatsapp_preference, instagram_account, instagram_preference,client_id);
            res.status(200).send(new Response (false,200,"Cliente Actualizado Exitosamente",req.body));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },//ok!!!    

    // Modificar datos de cliente
    deleteClient: async (req,res) => {
    try {
        const id = parseInt(req.params.id);
        await clientsQueries.deleteClientById(id);
        res.status(200).send(new Response (false,200,"Cliente Eliminado Exitosamente",""));
    } catch (error) {
        res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
    }
},//ok!!!
    

};

module.exports = {clients}