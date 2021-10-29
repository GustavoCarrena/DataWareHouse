const Response = require('../../../classes/response');
const {employeesQueries} = require('../../a_model/employees')
const jwt = require('jsonwebtoken');
const JWTKEY = process.env.JWTKEY;


const employeesMiddlewares = {

    /*=== Que no viajen campos vacíos para registro de Empleado ===*/
    dataFillValidate:  (req, res, next) => {
        const employeeData = req.body.firstname && req.body.lastname && req.body.email && req.body.role_id &&req.body.user_pass;
        !employeeData 
        ? res.status(400).send(new Response(true, 400, "No se pudo registrar el empleado", "Todos los campos deben contener datos"))
        :next();
    },

    /*=== Que no se repita email para registro de Empleado ===*/
    duplicateEmail: async(req, res, next) => {
        const {email} = req.body;   
        const getEmail = await employeesQueries.getEmployeesEmail()
        const duplicateEmail = getEmail.find(e => {return e.email == email})
        duplicateEmail ? res.status(409).send(new Response(true, 409, "El email ya se encuentra registrado para un empleado", duplicateEmail)):next();
    },

    /*=== Que EL PERFIL venga con el formato necesario ===*/
    roleIdValidate: (req, res, next) => {
        const {role_id} = req.body;
        role_id !== "ADMI" && role_id !== "USER" ? 
        res.status(409).send(new Response(true, 409, "El código de Perfil debe ser ADMI o USER", "Código no admitido:" + " " + role_id)):next();
    },

    /*=== Autenticación de JWT para operar ===*/
    authenticateJWT: (req, res, next) => {  
        
        const bearer =  req.headers['authorization']; 

        if (bearer) {
            const token =bearer.split(' ')[1];

            jwt.verify(token,JWTKEY, (err,tokenVerified) => {
                if (err) {
                    const errorToken = err.name === "TokenExpiredError" ? "Tiempo de token expirado" : "Token incorrecto";
                    return res.status(401).send(new Response(true, 404, "No es posible la autenticación", errorToken));
                } else {
                    req.user = tokenVerified;
                    next();
                };
            })
        } else {
            return res.status(404).send(new Response(true, 401, "No es posible la autenticación", "Se requiere Token"));
            };
    },

    /*=== Que el empleado tenga privilegios de administrador ===*/
    authenticateRole: (req, res, next) => {
        const bearer = req.headers['authorization'];
        const tokenbareer = bearer.split(' ')[1];
        const decoded = jwt.decode(tokenbareer);

        if (decoded['role'] === "ADMI") {
            next();
        } else {
            return res.status(401).send(new Response(true, 401, "El usuario no tiene privilegios de administrador", ""));
        }

    },

    /*=== Que no viajen campos vacíos para modificación de datos de Empleado ===*/
    updateDataFillValidate:  (req, res, next) => {
        const employeeData = req.body.id && req.body.firstname && req.body.lastname && req.body.email && req.body.role_id;
        !employeeData 
        ? res.status(400).send(new Response(true, 400, "No se pudo registrar el empleado", "Todos los campos deben contener datos"))
        :next();
    },

    employeeIdValidate: async (req, res, next) => {
        const {id} = req.body;
        const selectEmployeeId = await selectEmployeeId(id);
        selectEmployeeId ? next() :
        res.status(400).send(new Response(true, 400, "El empleado que intenta eliminar no existe", id));
    }
};   

module.exports={employeesMiddlewares}

