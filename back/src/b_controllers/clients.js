const Response = require ('../../classes/response');
const {clientsQueries} = require('../a_model/clients');


const clients = {


    // Alta de cliente
    addClient: async (req,res) => {
        try {
            const {firstname, lastname, position, email, company_id, city_id, clientAddress,  porposal_id, whatsapp_channel, whatsapp_account, whatsapp_preference,instagram_channel,instagram_account,instagram_preference} = req.body;
            await clientsQueries.createClient(firstname, lastname, position, email, company_id, city_id, clientAddress,  porposal_id);
            const lastInsertId = await clientsQueries.lastInsertId()
            client_id = lastInsertId[0]['last_insert_id()'];
            await clientsQueries.createContact(client_id,whatsapp_channel, whatsapp_account, whatsapp_preference,instagram_channel,instagram_account,instagram_preference)             
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


    // Modificar datos de cliente
    updateClient: async (req,res) => {
        try {
            const {id,firstname, lastname, phone, position, email, adress, city_id, porposal_interest,company_id} = req.body;
            await clientsQueries.updateClient(id,firstname, lastname, phone, position, email, adress, city_id, porposal_interest,company_id);
            res.status(200).send(new Response (false,200,"Empleado Actualizado Exitosamente",req.body));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },        



};

module.exports = {clients}