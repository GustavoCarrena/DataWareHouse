const Response = require('../../../classes/response');
const {
    employeesQueries
} = require('../../a_model/employees')
const jwt = require('jsonwebtoken');
const JWTKEY = process.env.JWTKEY;


const employeesMiddlewares = {

    /*=== Que no viajen campos vacíos para registro de Empleado ===*/
    dataFillValidate: (req, res, next) => {
        const employeeData = req.body.firstname && req.body.lastname && req.body.email && req.body.role_id && req.body.user_pass;
        const alphanumericValidation = /[A-Za-z0-9]/i;
        !employeeData ? res.status(400).send(new Response(true, 400, "No se pudo registrar el empleado", "Todos los campos deben contener datos")) :
            alphanumericValidation.test(req.body.firstname) === false || alphanumericValidation.test(req.body.lastname) === false || alphanumericValidation.test(req.body.user_pass) === false ?
            res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", "Todos los campos deben contener datos y el formato debe ser alfanumerico")) :
            typeof req.body.firstname !== 'string' || typeof req.body.lastname !== 'string' ?
            res.status(400).send(new Response(true, 400, "No se pudo realizar la operación ", "Los campos nombre y apellido deben contener caracteres alfabéticos")) :
            next();
    },

    /*=== Que no se repita email para registro de Empleado y el formato sea válido ===*/
    duplicateEmail: async (req, res, next) => {
        const {
            email
        } = req.body;
        const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const getEmail = await employeesQueries.getEmployeesEmail()
        const duplicateEmail = getEmail.find(e => {
            return e.email == email
        })
        duplicateEmail ? res.status(409).send(new Response(true, 409, "No se pudo realizar la operación", "El email ya se encuentra registrado para un empleado" + ' ' + duplicateEmail)) :
            emailValidation.test(email) === false ? res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", "Formato invalido del email")) :
            next();
    },

    /*=== Que EL PERFIL venga con el formato necesario ===*/
    roleIdValidate: (req, res, next) => {
        const {
            role_id
        } = req.body;
        role_id !== "ADMI" && role_id !== "USER" ?
            res.status(409).send(new Response(true, 409, "El código de Perfil debe ser ADMI o USER", "Código no admitido:" + " " + role_id)) : next();
    },

    /*=== Autenticación de JWT para operar ===*/
    authenticateJWT: (req, res, next) => {
        const bearer = req.headers['authorization'];
        if (bearer) {
            const token = bearer.split(' ')[1];
            jwt.verify(token, JWTKEY, (err, tokenVerified) => {
                if (err) {
                    const errorToken = err.name === "TokenExpiredError" ? "Tiempo de token expirado" : "Token incorrecto";
                    return res.status(401).send(new Response(true, 401, "No es posible la autenticación", errorToken));
                } else {
                    req.user = tokenVerified;
                    next();
                };
            })
        } else {
            return res.status(404).send(new Response(true, 404, "No es posible la autenticación", "Se requiere Token"));
        };
    },

    /*=== Que el empleado tenga privilegios de administrador ===*/
    authenticateRole: (req, res, next) => {
        const bearer = req.headers['authorization'];
        const tokenbareer = bearer.split(' ')[1];
        const decoded = jwt.decode(tokenbareer);
        if (decoded['role'] === "ADMI") {
            next()
        } else {
            return res.status(401).send(new Response(true, 401, "No se pudo realizar la operación", "El usuario no tiene privilegios de administrador"))
        };
    },

    // Que el empleado exista cuando se lo consulta por su Id
    validateId: async (req, res, next) => {
        const id = parseInt(req.params.id);
        const idCheck = await employeesQueries.getEmployeesData()
        const employeeIdValidate = idCheck.find(e => e.id === id)
        employeeIdValidate === undefined ?
            res.status(400).send(new Response(true, 400, "No se pudo realizar la operación", "No se pudo obtener el id del empleado")) :
            next();
    },

    /*=== Control de campos Update Empleado ===*/
    updateDataFillValidate: async (req, res, next) => {
        const employeeData = req.body.firstname && req.body.lastname && req.body.email && req.body.role_id && req.body.user_pass;
        const id = parseInt(req.params.id);
        const alphabeticValidation = /[A-Za-z ]/;
        const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const alphanumericValidation = /[A-Za-z0-9]/i;

        const employeesFullData = await employeesQueries.getEmployeesData();
        const employeeIdValidate = employeesFullData.find(e => e.id === id)

            !employeeData || employeeData === " " || employeeData === 0 ?
            res.status(400).send(new Response(true, 400, "No se pudo registrar el empleado", "Todos los campos deben contener datos")) :

            employeeIdValidate === undefined ?
            res.status(400).send(new Response(true, 400, "No se pudo realizar la operación.", " El id del empleado no existe")) :

            typeof req.body.firstname && typeof req.body.lastname !== 'string' || alphabeticValidation.test(req.body.firstname) === false || alphabeticValidation.test(req.body.lastname) === false ?
            res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El nombre y el apellido del empleado deben ser alfabéticos", {
                firstname: req.body.firstname,
                lastname: req.body.lastname
            })) :

            emailValidation.test(req.body.email) === false ?
            res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. ", "Formato inválido del email" + ' ' + req.body.email)) :

            req.body.role_id !== 'ADMI' && req.body.role_id !== 'USER' ?
            res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El Perfil debe ser ADMI o USER", req.body.role_id)) :

            alphanumericValidation.test(req.body.user_pass) == false ?
            res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. La contraseña debe contener caracteres alfanumericos y no puede estar vacía", "")) :

            next();
    },
};

module.exports = {
    employeesMiddlewares
}