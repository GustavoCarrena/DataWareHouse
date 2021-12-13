const Response = require('../../../classes/response');
const {
    clientsQueries
} = require('../../a_model/clients');


const clientsMiddlewares = {


    //validacion que exista id de cliente para actualizacion y eliminacion de datos
    validateClientId: async (req, res, next) => {
        const id = parseInt(req.params.id);
        (await clientsQueries.getClientsIdEmail()).find(e => e.id === id) === undefined ?
            res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", "No existe el Id de Cliente")) :
            next();
    },

};

module.exports = {
    clientsMiddlewares
};