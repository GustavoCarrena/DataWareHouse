const express = require('express');
const router = express.Router();
const {companies} = require('../b_controllers/companies');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {companiesMiddlewares} = require('../middlewares/local_middlewares/companies');

router.get('/getAllCompaniesData',companies.getAllCompaniesData);
router.post('/addCompany', employeesMiddlewares.authenticateJWT, companiesMiddlewares.dataValidateInsertCompany, companies.addCompany);
router.put('/updateCompany/:id', employeesMiddlewares.authenticateJWT, companiesMiddlewares.validateDataCompanyById, companies.updateCompany);
router.delete('/deleteCompany/:id', employeesMiddlewares.authenticateJWT, companiesMiddlewares.validateDataDeleteCompany,companies.deleteCompany);

module.exports = router;