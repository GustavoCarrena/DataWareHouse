const express = require('express');
const router = express.Router();
const {companies} = require('../b_controllers/companies');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
// const {regionsMiddlewares} = require('../middlewares/local_middlewares/regions');

router.get('/getAllCompaniesData', employeesMiddlewares.authenticateJWT,companies.getAllCompaniesData);
router.get('/addCompany', employeesMiddlewares.authenticateJWT,companies.addCompany);


module.exports = router;