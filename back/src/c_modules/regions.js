const express = require('express');
const router = express.Router();
const {regions} = require('../b_controllers/regions');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {regionsMiddlewares} = require('../middlewares/local_middlewares/regions')

router.get('/getAllRegionsData', employeesMiddlewares.authenticateJWT,regions.getAllDataRegions);
router.get('/getRegionsData', employeesMiddlewares.authenticateJWT,regions.getRegionsData);
router.get('/getCountriesData', employeesMiddlewares.authenticateJWT,regionsMiddlewares.dataFillCountryValidate, regions.getCountriesData);
router.get('/getCitiesData', employeesMiddlewares.authenticateJWT,regionsMiddlewares.dataFillCityValidate,regions.getCitiesData);
router.post('/createRegion', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertRegion, regions.addRegion);
router.post('/addCountry', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertCountry,regions.addCountry);



module.exports = router;