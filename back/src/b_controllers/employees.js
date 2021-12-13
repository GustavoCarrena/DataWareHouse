const {
    employeesQueries
} = require('../a_model/employees');
const Response = require('../../classes/response');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWTKEY = process.env.JWTKEY;

const employees = {

    /*=== Registro de empleado ===*/
    addEmployee: async (req, res) => {
        try {
            const {
                firstname,
                lastname,
                email,
                role_id,
                user_pass
            } = req.body;
            await employeesQueries.insertData([firstname, lastname, email, role_id, user_pass]);
            await employeesQueries.getRol(role_id);
            res.status(201).send(new Response(false, 201, "Registro de empleado exitoso", ""));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    /*=== Consulta de los id de perfiles y su descripción para utilizar en formulario de registro frontend ===*/
    getRoleDescription: async (req, res) => {
        try {
            const getRoleDescription = await employeesQueries.getRoleDescription();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getRoleDescription));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No fue posible obtener la consulta", error));
        }
    },

    /*=== Consulta de los datos de nómina de empleados ===*/
    getEmployeesData: async (req, res) => {
        try {
            const getEmployeesData = await employeesQueries.getEmployeesData();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getEmployeesData));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No fue posible obtener la consulta", error));
        }
    },

    /*=== Consulta de datos de empleado por su id ===*/
    getEmployeeById: async (req, res) => {
        try {
            const id = req.params.id;
            const getData = await employeesQueries.getData(id);
            const employeeData = await getData.find(element => element);
            res.status(200).send(new Response(false, 200, "Consulta exitosa", employeeData));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No fue posible obtener la consulta", error));
        }
    },

    /*=== Modificación de registros en nómina de empleados ===*/
    updateEmployeesData: async (req, res) => {
        try {
            const {
                firstname,
                lastname,
                email,
                role_id,
                user_pass
            } = req.body;
            const id = parseInt(req.params.id)
            await employeesQueries.updateEmployeesData([firstname, lastname, email, role_id, user_pass, id]);
            res.status(200).send(new Response(false, 200, "Modificación exitosa", ""));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error Interno del Servidor", error));
        }
    },

    /*=== Eliminacion de un registro de la tabla de empleados ===*/
    deleteEmployeesData: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const getData = await employeesQueries.getData(id);
            await employeesQueries.deleteEmployees(id);
            res.status(200).send(new Response(false, 200, `Eliminación exitosa`, getData));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "No fue posible realizar la eliminación", error));
        }
    },

    userLogin: async (req, res) => {

        try {

            const {
                email,
                user_pass
            } = req.body;
            const response = await employeesQueries.selectDataLogin([email, user_pass]);
            const user = response.find(u => {
                return u.email === email && u.user_pass === user_pass
            })

            if (!user) {
                res.status(403).send(new Response(true, 403, "No fue posible realizar la operación", "Email o Password incorrectos"))
            } else {
                const token = jwt.sign({
                        email: email,
                        pass: user_pass,
                        role: user.role_id
                    },
                    JWTKEY, {
                        expiresIn: '12h'
                    }, {
                        algorithm: 'RS256'
                    });
                res.status(200).send(new Response(false, 200, "Usuario logueado exitosamente", {
                    "usuario": email,
                    "token": token,
                    "roleId": response[0].role_id,
                }))
            }
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error Interno del Servidor", ""));
        }
    },

};

module.exports = {
    employees
}