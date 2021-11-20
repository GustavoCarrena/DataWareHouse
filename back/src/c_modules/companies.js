const express = require('express');
const router = express.Router();
const {companies} = require('../b_controllers/companies');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {companiesMiddlewares} = require('../middlewares/local_middlewares/companies');
// const {regionsMiddlewares} = require('../middlewares/local_middlewares/regions');

router.get('/getAllCompaniesData', employeesMiddlewares.authenticateJWT,companies.getAllCompaniesData);//ok
router.post('/addCompany', employeesMiddlewares.authenticateJWT, companiesMiddlewares.dataValidateInsertCompany, companies.addCompany);//ok
router.put('/updateCompany/:id', employeesMiddlewares.authenticateJWT, companiesMiddlewares.validateDataCompanyById, companies.updateCompany);//ok
router.delete('/deleteCompany/:id', employeesMiddlewares.authenticateJWT, companiesMiddlewares.validateDataDeleteCompany,companies.deleteCompany);//ok


module.exports = router;