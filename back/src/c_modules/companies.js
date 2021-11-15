const express = require('express');
const router = express.Router();
const {companies} = require('../b_controllers/companies');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {companiesMiddlewares} = require('../middlewares/local_middlewares/companies');
// const {regionsMiddlewares} = require('../middlewares/local_middlewares/regions');

router.get('/getAllCompaniesData', employeesMiddlewares.authenticateJWT,companies.getAllCompaniesData);
router.post('/addCompany', employeesMiddlewares.authenticateJWT, companiesMiddlewares.dataValidateInsertCompany, companies.addCompany);
router.put('/updateCompany', employeesMiddlewares.authenticateJWT, companiesMiddlewares.validateDataCompanyById, companies.updateCompany);
router.delete('/deleteCompany', employeesMiddlewares.authenticateJWT, companiesMiddlewares.validateDataDeleteCompany,companies.deleteCompany);


module.exports = router;