const express = require('express');
const router = express.Router();
const {employees} = require('../b_controllers/employees')
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees')

router.post('/addEmployees',employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole,employeesMiddlewares.roleIdValidate,employeesMiddlewares.dataFillValidate,employeesMiddlewares.duplicateEmail,employees.addEmployee);
router.get('/getRoleDescription',employees.getRoleDescription);
router.get('/employeesData',employees.getEmployeesData);
router.get('/getEmployeeById/:id', employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole, employeesMiddlewares.validateId,employees.getEmployeeById);
router.put('/updateEmployeesData/:id',employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole,employeesMiddlewares.updateDataFillValidate,employees.updateEmployeesData);
router.delete('/deleteEmployeesData/:id',employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole ,employees.deleteEmployeesData);
router.post('/employeesLogin', employees.userLogin);

module.exports = router;