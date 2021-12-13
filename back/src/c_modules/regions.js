const express = require('express');
const router = express.Router();
const {regions} = require('../b_controllers/regions');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {regionsMiddlewares} = require('../middlewares/local_middlewares/regions');

router.get('/getAllRegionsData',regions.getAllData);
router.get('/getCountriesData/:region_id',regions.getCountriesData);

router.post('/createRegion', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertRegion, regions.addRegion);
router.post('/addCountry/:region_id', employeesMiddlewares.authenticateJWT, regions.addCountry);
router.post('/addCity/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertCity, regions.addCity);

router.put('/updateRegion/:id', employeesMiddlewares.authenticateJWT, regions.updateRegion);
router.put('/updateCountry/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateUpdateCountry,regions.updateCountry);
router.put('/updateCity/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateUpdateCity,regions.updateCity);

router.delete('/deleteRegion/:id', employeesMiddlewares.authenticateJWT, regions.deleteRegion);
router.delete('/deleteCountry/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateDeleteCountry, regions.deleteCountry);
router.delete('/deleteCity/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateDeleteCity, regions.deleteCity);

router.get('/getRegionsData', regions.getRegionsData);
router.get('/getAllCountries', regions.getAllCountryData);
router.get('/getCitiesData/:country_id', regionsMiddlewares.dataFillCityValidate,regions.getCitiesData);
router.get('/getAllCities',regions.getAllCityData);



module.exports = router;