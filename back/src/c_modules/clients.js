const express = require('express');
const router = express.Router();
const {clients} = require('../b_controllers/clients');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {clientsMiddlewares} = require('../middlewares/local_middlewares/clients');

router.post('/addClient',employeesMiddlewares.authenticateJWT,clients.addClient);
router.get('/getPorposalInterestData', clients.getPorposalInterestData);
router.get('/getClientsView', clients.getClientsView);
router.get('/getUpdateClientsView/:id',clientsMiddlewares.validateClientId, clients.getUpdateClientsView);
router.put('/updateClient/:id', employeesMiddlewares.authenticateJWT,clients.updateClientData);
router.delete('/deleteClient/:id', employeesMiddlewares.authenticateJWT, clientsMiddlewares.validateClientId,clients.deleteClient);

module.exports = router;