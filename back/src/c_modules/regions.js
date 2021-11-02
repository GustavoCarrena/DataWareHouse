const express = require('express');
const router = express.Router();
const {regions} = require('../b_controllers/regions');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {regionsMiddlewares} = require('../middlewares/local_middlewares/regions');

router.get('/getAllRegionsData', employeesMiddlewares.authenticateJWT,regions.getAllData);
router.get('/getRegionsData', employeesMiddlewares.authenticateJWT,regions.getRegionsData);
router.get('/getAllCountries', employeesMiddlewares.authenticateJWT,regions.getAllCountryData);
router.get('/getCountriesData', employeesMiddlewares.authenticateJWT,regionsMiddlewares.dataFillCountryValidate, regions.getCountriesData);
router.get('/getCitiesData', employeesMiddlewares.authenticateJWT,regionsMiddlewares.dataFillCityValidate,regions.getCitiesData);
router.get('/getAllCities', employeesMiddlewares.authenticateJWT,regions.getAllCityData);
router.post('/createRegion', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertRegion, regions.addRegion);
router.post('/addCountry', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertCountry,regions.addCountry);
router.post('/addCity', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertCity, regions.addCity);
router.put('/updateRegion', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateUpdateRegion, regions.updateRegion);
router.put('/updateCountry', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateUpdateCountry,regions.updateCountry);
router.put('/updateCity', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateUpdateCity,regions.updateCity);
router.delete('/deleteRegion', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateDeleteRegion,regions.deleteRegion);
router.delete('/deleteCountry', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateDeleteCountry, regions.deleteCountry);
router.delete('/deleteCity', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateDeleteCity, regions.deleteCity);



module.exports = router;