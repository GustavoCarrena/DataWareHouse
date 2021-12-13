const sequelize = require('../../database/db_conection');

const employeesQueries = {

    /*=== Registro de Empleado ===*/
    insertData: (employeeData) => {
        return sequelize.query('INSERT INTO employees (firstname, lastname, email, role_id, user_pass) VALUES(?,?,?,?,?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: employeeData
        });
    },

    /*=== Consulta de Id de Perfil y Descripción de perfil para que el frontend autocomplete el campo en formulario de registro de usuario ===*/
    getRoleDescription: () => {
        return sequelize.query('SELECT * FROM roles ', {
            type: sequelize.QueryTypes.SELECT
        });
    },

    /*=== Consulta de datos de toda la nómina de empleados ===*/
    getEmployeesData: () => {
        return sequelize.query(`SELECT e.id, e.firstname, e.lastname, e.email, e.role_id ,r.role_description,e.user_pass
        FROM employees e
        INNER JOIN roles r
        ON (e.role_id = r.id)`,{
        type: sequelize.QueryTypes.SELECT
        });
    },

    //Lista de Roles para formulario Front
    getRol: (id) => {
        return sequelize.query('SELECT role_description FROM roles WHERE id = ? ', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [id]
        });
    },

    // Lista de emails ya registrados para Middleware
    getEmployeesEmail: () => {
        return sequelize.query('SELECT email FROM employees ', {
            type: sequelize.QueryTypes.SELECT
            
        });
    },

    /*=== Modificacion de registros de los empleados ===*/
    updateEmployeesData: (id) => {
        return sequelize.query('UPDATE employees SET firstname = ?, lastname = ?, email = ?, role_id = ?, user_pass = ? WHERE id = ?',{
            type: sequelize.QueryTypes.UPDATE,
            replacements:id
        });
    },

    /*=== Consulta datos de empleado por ID para baja ===*/

    getData: (id) => {
        return sequelize.query(`SELECT * FROM employees WHERE id = ?`,{
        type: sequelize.QueryTypes.SELECT,
        replacements: [id]
        });
    },

    /*=== eliminacion de un empleado de la base ===*/
    deleteEmployees: (data) =>{
        return sequelize.query('DELETE FROM employees WHERE id = ?',{
            type: sequelize.QueryTypes.DELETE,
            replacements: [data]
        });
    },

    /*=== seleccion de datos para el login de empleados===*/
    selectDataLogin: (dataLogin) => {
        return sequelize.query('SELECT email, user_pass, role_id FROM employees WHERE email = ? AND user_pass = ?',{
            type: sequelize.QueryTypes.SELECT,
            replacements: dataLogin
        })
    },

    selectEmployeeId: (id) => {
        return sequelize.query('SELECT id, firstname, lastname, email FROM employees WHERE id = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [id]
        });
    }
    
}

module.exports = {employeesQueries}