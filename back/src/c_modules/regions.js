const express = require('express');
const router = express.Router();
const {regions} = require('../b_controllers/regions');
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees');
const {regionsMiddlewares} = require('../middlewares/local_middlewares/regions');

router.get('/getAllRegionsData', employeesMiddlewares.authenticateJWT,regions.getAllData);//Consulta de todas las regiones con sus paises y ciudades de esos paises
router.get('/getRegionsData', employeesMiddlewares.authenticateJWT,regions.getRegionsData);//Consulta de Id y Nombre de las Regiones
router.get('/getAllCountries', employeesMiddlewares.authenticateJWT,regions.getAllCountryData);//Consulta de todos los paises con su region asociada
router.get('/getCountriesData', employeesMiddlewares.authenticateJWT,regionsMiddlewares.dataFillCountryValidate, regions.getCountriesData);//Consulta de paises por id de region
router.get('/getCitiesData', employeesMiddlewares.authenticateJWT,regionsMiddlewares.dataFillCityValidate,regions.getCitiesData);//Consulta de ciudades por Id de Pais
router.get('/getAllCities', employeesMiddlewares.authenticateJWT,regions.getAllCityData);//Consulta de todas las ciudades con su pais y region asociada
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