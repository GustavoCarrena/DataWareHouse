const Response = require('../../../classes/response');
const {companiesQueries} = require('../../a_model/companies');

const companiesMiddlewares = {

    dataValidateInsertCompany: async (req, res, next) => {
        const {company_name, city_id, company_address,phone} = req.body;
        const email = req.body.email

        const validator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        

       

        validator.test(email) ?
        console.log('si'):
       console.log('no');
       
        // next();
    },


};

module.exports = {companiesMiddlewares};