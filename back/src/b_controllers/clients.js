const Response = require ('../../classes/response');
const {contactChannelQueries, clientsQueries} = require('../a_model/clients');

const contactChannel = {

    // Lista de los canales
    getChannelsData: async (req, res) => {
        try {
            const getData = await contactChannelQueries.getChannels();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", error));
        }
    },

    // Creación de canal
    addChannel: async (req,res) => {
        try {
            const {channel_description} = req.body;
            await contactChannelQueries.createChannel(channel_description);
            res.status(200).send(new Response (false,200,"Canal Creado Exitosamente",req.body));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Actualización de descripción del canal
    updateChannel: async (req,res) => {
        const {id, channel_description} = req.body;
        try {
            await contactChannelQueries.updateChannel(id,channel_description);
            res.status(200).send(new Response (false,200,"Canal Actualizado Exitosamente",channel_description))
        } catch (error) {
            console.log(error);
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        };
    },
    
    //Eliminación de canal
    deleteChannel: async (req,res) => {
        try {
            const {id} = req.body;
            await contactChannelQueries.deleteChannelById(id);
            res.status(200).send(new Response (false,200,"Canal Eliminado Exitosamente",req.body.id))
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },
    
    //Lista de todos los canales de contacto asociados a un cliente
    getAllContactChannels: async (req, res) => {
        try {
            const getData = await contactChannelQueries.getAllContactChannel();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", error));
        }
    },

};

const clients = {
    // Lista de todos los datos de los clientes
    getClientsView: async (req, res) => {
        try {
            const getData = await clientsQueries.getClientsView();
           
        



            

            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", error));
        }
    },


        // Creación de canal
        addClient: async (req,res) => {
            try {
                const {firstname, lastname, phone, position, email, adress, city_id, porposal_interest,company_id} = req.body;
                await clientsQueries.createClient(firstname, lastname, phone, position, email, adress, city_id, porposal_interest,company_id);
                res.status(200).send(new Response (false,200,"Canal Creado Exitosamente",req.body));
            } catch (error) {
                res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
            }
        },



};

module.exports = {contactChannel, clients}