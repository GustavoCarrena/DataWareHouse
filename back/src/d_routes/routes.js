const employees = require('../c_modules/employees');
const regions = require('../c_modules/regions');

module.exports = function (app) {
    app.use('/employees',employees);
    app.use('/regions',regions);
};