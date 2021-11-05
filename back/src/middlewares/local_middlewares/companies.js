const Response = require('../../../classes/response');
const {companiesQueries} = require('../../a_model/companies');

const companiesMiddlewares = {

    dataValidateInsertCompany: async (req, res, next) => {
        
        const company_name = req.body.company_name; 
        const city_id = req.body.city_id;
        const company_address = req.body.company_address;
        const email = req.body.email;
        const phone = req.body.phone.toString();
        const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const alphanumericValidation = /[A-Za-z0-9]/i;

        typeof company_name !== 'string' || alphanumericValidation.test(company_name) === false ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de nombre de la compañia debe ser alfanmerico y no puede estar vacío", "")):
        
        typeof city_id !== 'number' ||numericValidation.test(city_id) === true ||city_id === " " ||  city_id.toString().length === 0 ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato del código de ciudad debe ser numérico entero y no puede estar vacío", "")):

        typeof company_address !== 'string' ||  alphanumericValidation.test(company_address) === false ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de domicilio de la compañia debe ser alfanmerico y no puede estar vacío", "")):

        typeof email !== 'string'||emailValidation.test(email) === false || email.length === 0 || email === " "?  
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Formato de email invalido o campo vacio", "")):

        phone.length === 0 || phone === " " ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de domicilio de la compañia debe ser alfanmerico y no puede estar vacío", "")):



        next();
        


    //     validator.test(email) ?
    //     console.log('si'):
    //    console.log('no');
       
        // next();
    },


};

module.exports = {companiesMiddlewares};