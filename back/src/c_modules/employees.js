const express = require('express');
const router = express.Router();
const {employees} = require('../b_controllers/employees')
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees')

router.post('/addEmployees',employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole,employeesMiddlewares.roleIdValidate,employeesMiddlewares.dataFillValidate,employeesMiddlewares.duplicateEmail,employees.addEmployee);
router.get('/getRoleDescription',employees.getRoleDescription);// Para que el Frontend obtenga descripción de roles
router.get('/employeesData', employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole, employees.getEmployeesData);
router.put('/updateEmployeesData',employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole,employeesMiddlewares.updateDataFillValidate,employees.updateEmployeesData);
router.delete('/deleteEmployeesData',employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole,employeesMiddlewares.employeeDeleteValidate ,employees.deleteEmployeesData);
router.post('/employeesLogin', employees.userLogin);
router.get('/employeesLogout',employees.userLogout);




module.exports = router;