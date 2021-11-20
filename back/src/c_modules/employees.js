const express = require('express');
const router = express.Router();
const {employees} = require('../b_controllers/employees')
const {employeesMiddlewares} = require('../middlewares/local_middlewares/employees')

router.post('/addEmployees',employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole,employeesMiddlewares.roleIdValidate,employeesMiddlewares.dataFillValidate,employeesMiddlewares.duplicateEmail,employees.addEmployee);//ok
router.get('/getRoleDescription',employees.getRoleDescription);// ok
router.get('/employeesData', employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole, employees.getEmployeesData);//ok
router.get('/getEmployeeById/:id', employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole, employeesMiddlewares.validateId,employees.getEmployeeById);//ok
router.put('/updateEmployeesData/:id',employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole,employeesMiddlewares.updateDataFillValidate,employees.updateEmployeesData);//ok
router.delete('/deleteEmployeesData/:id',employeesMiddlewares.authenticateJWT,employeesMiddlewares.authenticateRole,employeesMiddlewares.employeeDeleteValidate ,employees.deleteEmployeesData);//ok
router.post('/employeesLogin', employees.userLogin);//ok
router.get('/employeesLogout',employees.userLogout);

module.exports = router;