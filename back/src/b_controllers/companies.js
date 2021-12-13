const Response = require ('../../classes/response');
const {companiesQueries} = require('../a_model/companies');


const companies = {


    // Toda la información de companias
    getAllCompaniesData: async (req, res) => {
        try {
            const getData = await companiesQueries.getAllDataCompanies();
            res.status(200).send(new Response(false, 200, "Consulta exitosa", getData));
        } catch (error) {
            res.status(400).send(new Response(true, 400, "No se puede obtener la consulta", error));
        }
    },

    // Creación de companias
    addCompany: async (req,res) => {
        try {
            const {company_name, city_id, company_address, email, phone} = req.body;
            await companiesQueries.createCompany(company_name, city_id, company_address, email, phone);
            res.status(200).send(new Response (false,200,"Compañía Creada Exitosamente",""));
        } catch (error) {
            res.status(500).send(new Response(true, 500, "Error interno del servidor", error));
        }
    },

    // Actualización de datos de las Compañías
    updateCompany: async (req,res) => {
        const id = parseInt(req.params.id);
        const {company_name, city_id, company_address, email, phone} = req.body;
        try {
            await companiesQueries.updateCompany(id, company_name,city_id, company_address, email, phone);
            res.status(200).send(new Response (false,200,"Compañia Actualizada Exitosamente",""))
        } catch (error) {
            console.log(error);
            res.status(500).send(new Response(true, 400, "No se pudo realizar la operación", error));
        };
    },
    
        // Eliminación de Compañia
        deleteCompany: async (req,res) => {
            try {
                const id = parseInt(req.params.id);
                await companiesQueries.deleteCompanyById(id);
                res.status(200).send(new Response (false,200,"Compañía Eliminada Exitosamente",req.body.id))
            } catch (error) {
                res.status(500).send(new Response(true, 400, "No se pudo realizar la operación", error));
            }
        },

};

module.exports = {companies};

