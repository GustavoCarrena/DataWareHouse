const express = require('express');
const router = express.Router();
const {companies} = require('../b_controllers/companies');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {companiesMiddlewares} = require('../middlewares/local_middlewares/companies');
// const {regionsMiddlewares} = require('../middlewares/local_middlewares/regions');

router.get('/getAllCompaniesData', employeesMiddlewares.authenticateJWT,companies.getAllCompaniesData);
router.get('/addCompany', employeesMiddlewares.authenticateJWT, companiesMiddlewares.dataValidateInsertCompany, companies.addCompany);
router.put('/updateCompany', employeesMiddlewares.authenticateJWT, companies.updateCompany);


module.exports = router;