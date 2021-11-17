const express = require('express');
const router = express.Router();
const {clients} = require('../b_controllers/clients');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {clientsMiddlewares} = require('../middlewares/local_middlewares/clients');

router.post('/addClient', employeesMiddlewares.authenticateJWT, clientsMiddlewares.dataValidateCreateClient,clients.addClient);//ok
router.get('/getPorposalInterestData', employeesMiddlewares.authenticateJWT,clients.getPorposalInterestData);//ok
router.get('/getClientsView', employeesMiddlewares.authenticateJWT,clients.getClientsView);//ok
// router.get('/updateClientView', employeesMiddlewares.authenticateJWT, clients.updateClientView);
router.put('/updateClient', employeesMiddlewares.authenticateJWT, clients.updateClient);


module.exports = router;