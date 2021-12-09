const express = require('express');
const router = express.Router();
const {clients} = require('../b_controllers/clients');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {clientsMiddlewares} = require('../middlewares/local_middlewares/clients');

router.post('/addClient',/* employeesMiddlewares.authenticateJWT, clientsMiddlewares.dataValidateCreateClient,*/clients.addClient);//ok
router.get('/getPorposalInterestData', /*employeesMiddlewares.authenticateJWT,*/clients.getPorposalInterestData);//ok
router.get('/getClientsView', /*employeesMiddlewares.authenticateJWT,*/clients.getClientsView);//ok
router.get('/getUpdateClientsView/:id', /*employeesMiddlewares.authenticateJWT,*/ clientsMiddlewares.validateClientId, clients.getUpdateClientsView);//ok
router.put('/updateClient/:company_id/:city_id/:porposal_id/:id', /*employeesMiddlewares.authenticateJWT,*/ clientsMiddlewares.dataValidateUpdateClient,clients.updateClientData);//ok
router.delete('/deleteClient/:id', /*employeesMiddlewares.authenticateJWT,*/ clientsMiddlewares.validateClientId,clients.deleteClient);//ok


module.exports = router;