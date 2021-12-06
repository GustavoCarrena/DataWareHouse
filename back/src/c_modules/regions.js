const express = require('express');
const router = express.Router();
const {regions} = require('../b_controllers/regions');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {regionsMiddlewares} = require('../middlewares/local_middlewares/regions');

router.get('/getAllRegionsData', /*employeesMiddlewares.authenticateJWT,*/regions.getAllData);//ok
router.get('/getCountriesData/:region_id', employeesMiddlewares.authenticateJWT,regionsMiddlewares.dataFillCountryValidate, regions.getCountriesData);//ok!!!

router.post('/createRegion', /*employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertRegion,*/ regions.addRegion);//ok
router.post('/addCountry/:region_id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertCountry,regions.addCountry);
router.post('/addCity/:id', /*employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateInsertCity,*/ regions.addCity);//ok

router.put('/updateRegion/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateUpdateRegion, regions.updateRegion);//ok
router.put('/updateCountry/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateUpdateCountry,regions.updateCountry);//ok
router.put('/updateCity/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateUpdateCity,regions.updateCity);//ok

router.delete('/deleteRegion/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateDeleteRegion,regions.deleteRegion);//ok
router.delete('/deleteCountry/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateDeleteCountry, regions.deleteCountry);//ok
router.delete('/deleteCity/:id', employeesMiddlewares.authenticateJWT, regionsMiddlewares.dataValidateDeleteCity, regions.deleteCity);//ok

router.get('/getRegionsData', /*employeesMiddlewares.authenticateJWT,*/regions.getRegionsData);//ok
router.get('/getAllCountries', employeesMiddlewares.authenticateJWT,regions.getAllCountryData);//ok
router.get('/getCitiesData/:country_id', employeesMiddlewares.authenticateJWT,regionsMiddlewares.dataFillCityValidate,regions.getCitiesData);//ok
router.get('/getAllCities', employeesMiddlewares.authenticateJWT,regions.getAllCityData);//ok



module.exports = router;