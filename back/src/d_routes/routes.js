
const employees = require('../c_modules/employees');
const regions = require('../c_modules/regions');
const companies = require('../c_modules/companies');
const clients = require('../c_modules/clients');

module.exports = function (app) {
    app.use('/employees',employees);
    app.use('/regions',regions);
    app.use('/companies', companies);
    app.use('/clients', clients);

};