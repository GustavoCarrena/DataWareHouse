const express = require('express');
const router = express.Router();
const {contactChannel, clients} = require('../b_controllers/clients');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {clientsMiddlewares} = require('../middlewares/local_middlewares/clients');

router.get('/getChannels', employeesMiddlewares.authenticateJWT,contactChannel.getChannelsData);
router.post('/addChannel', employeesMiddlewares.authenticateJWT, clientsMiddlewares.dataValidateInsertChannel,contactChannel.addChannel);
router.put('/updateChannel', employeesMiddlewares.authenticateJWT, clientsMiddlewares.dataValidateUpdateChannel,contactChannel.updateChannel);
router.delete('/deleteChannel', employeesMiddlewares.authenticateJWT, clientsMiddlewares.dataValidateDeleteChannel,contactChannel.deleteChannel);

router.get('/getAllContactChannels', employeesMiddlewares.authenticateJWT,contactChannel.getAllContactChannels);
router.get('/getClientsView', employeesMiddlewares.authenticateJWT,clients.getClientsView);

router.post('/addClient', employeesMiddlewares.authenticateJWT, clients.addClient);

module.exports = router;