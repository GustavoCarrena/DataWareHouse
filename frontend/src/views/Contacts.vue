<template>
<div id="container" class="row p-6 container">
    <header>

        <div class="first-header">
            <h1 class="row col-5">Gestion de Contactos</h1>
            <b-nav class="navbar">
                <b-nav-item v-if="usersAccess()===true" href="http://localhost:8080/employee">Usuarios</b-nav-item>
                <b-nav-item href="http://localhost:8080/regions">Regiones</b-nav-item>
                <b-nav-item href="http://localhost:8080/companies">Compañias</b-nav-item>
                <b-nav-item @click="logOut()" href="http://localhost:8080">Salir</b-nav-item>
            </b-nav>
        </div>

        <div class="second-header">
            <b-button size="sm" class="col-2 mr-2 btnppal" variant="success" @click="showEdit({},'create')">
                Alta de Contacto
            </b-button>
            <div class="search">
                <div class="search-box">
                    <label class="search-label" for="search">
                        <strong> Busqueda</strong></label>
                </div>
                <div>
                    <b-form-input name="search" v-model="filter" class="mr-sm-2" type="search">
                    </b-form-input>
                </div>
            </div>
        </div>
    </header>

    <b-table bordered ref="selectableTable" hover selectable select-mode="multi" responsive="true" sticky-header="62vh" :filter="filter" :items="contacts" :fields="fields" @row-selected="onRowSelected">
        <template #cell(status)="{ rowSelected }">
            <input name="checkbox" type="checkbox" :checked="rowSelected" disabled />
        </template>
        <template #cell(actions)="row">
            <b-button variant="warning" size="sm" class="col-8 mr-2" @click="showEdit(row.item)">
                Editar
            </b-button>
        </template>
    </b-table>

    <div class="footer">
        <b-button size="sm" class="col-2 mr-2 btnppal" variant="danger" @click="showMsgBoxOne">
            Eliminar Seleccionados
        </b-button>

        <b-button v-if="selected.length>0" size="sm" class="col-2 mr-2 btnppal" variant="outline-danger" @click="clearSelected(), cancel()">
            <div class="c-btn">
                <span>Usuarios seleccionados : </span>
                <strong>{{selected.length}}</strong>
                <span>Cancelar Seleccion</span>
            </div>
        </b-button>
    </div>

    <b-modal id="deleteInfo">
        Registro Eliminado Exitosamente
    </b-modal>

    <b-modal class="editModal" id="editModal" title="Ingreso de Datos" hide-footer>
        <form>
            <label class="lab" for="name"><strong>Nombre</strong></label>
            <input name="name" type="text" v-model="contactSelected.firstname" class="form-control input" />
            <label class="lab" for="lastname"><strong>Apellido</strong></label>
            <input name="lastname" type="text" v-model="contactSelected.lastname" class="form-control mt-3 input" />
            <label class="lab" for="position"><strong>Cargo</strong></label>
            <input name="position" type="text" v-model="contactSelected.position" class="form-control mt-3 input" />
            <label class="lab" for="email"><strong>Email</strong></label> <br>
            <small><i>Formato "xx@xx.xx" requerido</i></small>
            <input name="email" type="text" v-model="contactSelected.email" class="form-control mt-3 input" />

            <label class="lab" for="comId"><strong>Compañia</strong></label>
            <b-form-select name="comId" class="mt-3 input" v-model="contactSelected.company_id" :options="companiesOptions">
            </b-form-select>

            <label class="lab" for="reId"><strong>Región</strong></label>
            <b-form-select name="reId" class="mt-3 input" v-model="selectedRegion" :options="regionsOptions">
            </b-form-select>

            <label class="lab" for="coId"><strong>País</strong></label>
            <b-form-select name="coId" class="mt-3 input" v-model="selectedCountry" :disabled="!selectedRegion" :options="countriesOptions">
            </b-form-select>

            <label class="lab" for="ciId"><strong>Ciudad</strong></label>
            <b-form-select name="ciId" class="mt-3 input" v-model="contactSelected.city_id" :disabled="!selectedCountry || !cities.length" :options="citiesOptions">
            </b-form-select>

            <label class="lab" for="cliAd"><strong>Dirección</strong></label>
            <input name="cliAd" type="text" v-model="contactSelected.clientAddress" :disabled="!contactSelected.city_id" class="form-control mt-3 input" />

            <label class="lab" for="porp"><strong>Interés</strong></label>
            <b-form-select name="porp" class="mt-3 input" v-model="contactSelected.porposal_id" :options="interestOptions">
            </b-form-select>

            <label class="lab" for="whatAc"><strong>Cuenta de Usuario Whatsapp</strong></label>
            <input name="whatAc" type="text" v-model="contactSelected.whatsapp_account" class="form-control mt-3 input" />
            <label class="lab" for="whatPref"><strong>Preferencia</strong></label>
            <b-form-select name="whatPref" class="mt-3 input" v-model="contactSelected.whatsapp_preference" :options="[{ value: 'Sin Preferencia', text: 'Sin Preferencia' },{ value: 'Canal Favorito', text: 'Canal Favorito' },{ value: 'No Molestar', text: 'No Molestar' }]">
            </b-form-select>

            <label class="lab" for="instAc"><strong>Cuenta de Usuario Instagram</strong></label>
            <input name="instAc" type="text" v-model="contactSelected.instagram_account" class="form-control mt-3 input" />
            <label class="lab" for="instPref"><strong>Preferencia</strong></label>
            <b-form-select name="instPref" class="mt-3 input" v-model="contactSelected.instagram_preference" :options="[{ value: 'Sin Preferencia', text: 'Sin Preferencia' },{ value: 'Canal Favorito', text: 'Canal Favorito' },{ value: 'No Molestar', text: 'No Molestar' }]">
            </b-form-select>

            <b-button @click="$bvModal.hide('editModal'), getContactData(), cancel()" class="mt-3 mr-4 mod">
                Cancelar
            </b-button>
            <b-button v-if="modalMode === 'edit'" @click="updateContact()" class="mt-3 mod" variant="success">
                Actualizar
            </b-button>
            <b-button v-else @click="createContact()" class="mt-3 mod" variant="success">Crear
            </b-button>
            <small><i> (*) Campos obligatorios</i></small>
        </form>
    </b-modal>

</div>
</template>

<script>
export default {
    name: "Contacts",
    data() {
        return {
            filter: '',
            boxOne: '',
            contacts: [],
            filteredContacts: [],
            selected: [],
            contactSelected: {},
            modalMode: "edit",
            companies: [],
            regions: [],
            selectedRegion: null,
            selectedCountry: null,
            countries: [],
            cities: [],
            interests: [],
            fields: [{
                    key: "status",
                    label: "",
                },
                {
                    key: "fullname",
                    sortable: true,
                    label: "Contacto",
                },
                {
                    key: "email",
                    sortable: true,
                    label: "Correo",
                },
                {
                    key: "country_name",
                    sortable: true,
                    label: "Pais",
                },
                {
                    key: "region_name",
                    sortable: true,
                    label: "Region",
                },
                {
                    key: "company_name",
                    sortable: true,
                    label: "Compañia",
                },
                {
                    key: "position",
                    sortable: true,
                    label: "Cargo",
                },
                {
                    key: "porposal_description",
                    sortable: true,
                    label: "Interes",
                },
                {
                    key: "actions",
                    sortable: false,
                    label: "Editar",
                },
            ],
        };
    },
    mounted() {
        this.getContactData();
        this.getCompaniesData();
        this.getInterestData();
        this.getRegionsData();
    },

    watch: {
        selectedRegion(value) {
            this.contactSelected.region_id = value;
            this.countries = this.getCountriesByRegion(value);
            this.cities = [];
        },

        selectedCountry(value) {
            this.contactSelected.country_id = value
            this.cities = value ? this.getCitiesByCountry(value) : [];
        },
    },

    computed: {
        companiesOptions() {
            if (this.companies.length) {
                return this.companies.map(company => ({
                    value: company.id,
                    text: company.company_name
                }))
            } else {
                return [];
            }
        },

        interestOptions() {
            if (this.interests.length) {
                return this.interests.map(interest => ({
                    value: interest.porposal_id,
                    text: interest.porposal_description
                }))
            } else {
                return [];
            }
        },

        regionsOptions() {
            if (this.regions.length) {
                return this.regions.map(region => this.getObjectOption(region.region_id, region.region_name))
            } else {
                return [];
            }
        },

        countriesOptions() {

            if (this.countries.length) {
                return this.countries.map(country => this.getObjectOption(country.country_id, country.country_name))
            } else {
                return [];
            }

        },

        citiesOptions() {
            if (this.cities.length) {
                return this.cities.map(city => this.getObjectOption(city.city_id, city.city_name))
            } else {
                return [];
            }
        },

    },

    methods: {
        
        usersAccess(){
            if (localStorage.getItem('role') === 'ADMI') {
                return true; 
            } else {
                return false;
            }
        },

        logOut(){
            localStorage.clear();
        },

        getCountriesByRegion(regionId) {
            const region = this.regions.find(region => region.region_id === regionId)
            return region.countries
        },

        getCitiesByCountry(countryId) {
            const country = this.countries.find(country => country.country_id === countryId)
            return country.cities
        },

        success() {
            this.$alertify.success('OPERACIÓN EXITOSA');
        },

        cancel() {
            this.$alertify.error('OPERACIÓN CANCELADA');
        },

        showMsgBoxOne() {
            this.boxOne = ''
            this.$bvModal.msgBoxConfirm('¿Está seguro que desea eliminar los registros?')
                .then(value => {
                    this.boxOne = value
                    const isSelected = this.selected.map(e => e.id).length
                    value === true && isSelected > 0 ?
                        (this.deleteContactById(), this.success()) :
                        isSelected == 0 ? this.$bvModal.msgBoxOk('Debe seleccionar al menos 1 registro para eliminar') :
                        this.cancel()
                })
                .catch(err => {
                    err
                });
        },

        showEdit(contact, mode = "edit") {
            this.modalMode = mode;
            this.contactSelected = contact;
            this.selectedRegion = contact.region_id;
            this.selectedCountry = contact.country_id;
            this.$bvModal.show("editModal");
        },

        onRowSelected(items) {
            this.selected = items;
        },

        clearSelected() {
            this.$refs.selectableTable.clearSelected();
        },

        getDuplicatedEmail() {
            const dataTable = this.contacts.map(e => e.email)
            const emailInsert = this.contactSelected.email
            return dataTable.includes(emailInsert)
        },

        disableSubmit() {
            const firstname = this.contactSelected.firstname;
            const lastname = this.contactSelected.lastname;
            const position = this.contactSelected.position;
            const email = this.contactSelected.email;
            const company_id = this.contactSelected.company_id;
            const city_id = this.contactSelected.city_id;
            const clientAddress = this.contactSelected.clientAddress;
            const porposal_id = this.contactSelected.porposal_id;
            const whatsapp_account = this.contactSelected.whatsapp_account;
            const whatsapp_preference = this.contactSelected.whatsapp_preference;
            const instagram_account = this.contactSelected.instagram_account;
            const instagram_preference = this.contactSelected.instagram_preference;
            const emailRules = /.+@.+/.test(email);
            return !firstname || !lastname || !email || !position || !company_id ||
                !city_id || emailRules === false || !clientAddress || !porposal_id || !whatsapp_account ||
                !whatsapp_preference || !instagram_account || !instagram_preference
        },

        validateNewEmail(oldEmail, newEmail) {
            const searchEmail = oldEmail.reduce((acc, clients) => {
                acc[clients.email] = ++acc[clients.email] || 0;
                return acc
            }, {});
            let duplicatedEmail = oldEmail.filter((client) => {
                return searchEmail[client.email]
            });
            const duplicatedEmailMap = duplicatedEmail.map(e => e.email).find(e => e === newEmail)
            for (let i = 0; i < duplicatedEmail.length; i++) {
                if (duplicatedEmailMap !== undefined) {
                    return true;
                }
            }
        },

        getObjectOption(value, text) {
            return {
                value,
                text
            }
        },

        async getRegionsData() {
            const url = "http://localhost:3000/regions/getAllRegionsData";
            try {
                const response = await fetch(url);
                const data = await response.json();
                this.regions = data.response
            } catch (error) {
                console.log(error);
            }
        },

        async getCompaniesData() {
            const url = "http://localhost:3000/companies/getAllCompaniesData";
            try {
                const response = await fetch(url);
                const data = await response.json();
                this.companies = data.response
            } catch (error) {
                console.log(error);
            }
        },

        async getInterestData() {
            const url = "http://localhost:3000/clients/getPorposalInterestData";
            try {
                const response = await fetch(url);
                const data = await response.json();
                this.interests = data.response
            } catch (error) {
                error;
            }
        },

        async getContactData() {
            const url = "http://localhost:3000/clients/getClientsView";
            try {
                const response = await fetch(url);
                const data = await response.json();
                this.contacts = data.response
            } catch (error) {
                error
            }
        },

        async createContact() {
            const formatDataValidate = this.disableSubmit()
            const duplicatedEmail = this.getDuplicatedEmail()

            if (!formatDataValidate && !duplicatedEmail) {
                try {
                    const url = `http://localhost:3000/clients/addClient`;

                    let payload = {
                        firstname: this.contactSelected.firstname,
                        lastname: this.contactSelected.lastname,
                        position: this.contactSelected.position,
                        email: this.contactSelected.email,
                        company_id: this.contactSelected.company_id,
                        city_id: this.contactSelected.city_id,
                        clientAddress: this.contactSelected.clientAddress,
                        porposal_id: this.contactSelected.porposal_id,
                        whatsapp_account: this.contactSelected.whatsapp_account,
                        whatsapp_preference: this.contactSelected.whatsapp_preference,
                        instagram_account: this.contactSelected.instagram_account,
                        instagram_preference: this.contactSelected.instagram_preference
                    };
                    const token = localStorage.getItem('token')
                    const response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify(payload),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: 'Bearer' + ' ' + token
                        },
                    });
                    const data = await response.json()
                    if (data.status === 401 || data.status === 404) {
                        this.$bvModal.msgBoxOk(data.response)
                    } else {
                    this.getContactData()
                    this.$bvModal.msgBoxOk('Contacto creado exitosamente');
                    payload = ''
                    this.$bvModal.hide("editModal");
                    this.$alertify.success('OPERACIÓN EXITOSA');
                    }
                } catch (error) {
                    error
                }
            } else {
                duplicatedEmail ?
                    this.$bvModal.msgBoxOk(`El email "${this.contactSelected.email}" ya se encuentra registrado`) :
                    this.$bvModal.msgBoxOk('Alguno de los formatos requeridos no son válidos o existen campos vacíos');
            }
        },

        async updateContact() {
            try {
                const url = `http://localhost:3000/clients/updateClient/${this.contactSelected.client_id}`;
                let payload = {
                    firstname: this.contactSelected.firstname,
                    lastname: this.contactSelected.lastname,
                    position: this.contactSelected.position,
                    email: this.contactSelected.email,
                    company_id: this.contactSelected.company_id,
                    city_id: this.contactSelected.city_id,
                    clientAddress: this.contactSelected.clientAddress,
                    porposal_id: this.contactSelected.porposal_id,
                    whatsapp_account: this.contactSelected.whatsapp_account,
                    whatsapp_preference: this.contactSelected.whatsapp_preference,
                    instagram_account: this.contactSelected.instagram_account,
                    instagram_preference: this.contactSelected.instagram_preference
                };
                const token = localStorage.getItem('token')
                const response = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer' + ' ' + token
                    },
                });
                const data = await response.json()
                if (data.status === 401 || data.status === 404) {
                    this.$bvModal.msgBoxOk(data.response)
                } else {
                this.$bvModal.hide("editModal")
                this.success()
                await this.getContactData()                    
                }
            } catch (error) {
                error
            }
        },

        async deleteContact(id) {
            try {
                const url = `http://localhost:3000/clients/deleteClient/${id}`;
                const token = localStorage.getItem('token')
                const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer' + ' ' + token
                    },
                });
                const data = await response.json()
                    if (data.status === 401 || data.status === 404) {
                        this.$bvModal.msgBoxOk(data.response)
                    } else {
                        await this.getContactData();
                        this.success()
                    }
            } catch (error) {
                error
            }
        },

        deleteContactById() {
            this.selected.forEach((contact) => this.deleteContact(contact.client_id));
        },
    },
};
</script>

<style scoped>
header {
    width: 95vw;
    padding: 11px;
}

.first-header {
    display: flex;
    flex-flow: row nowrap;
    width: 95%;
    align-items: center;
    margin-bottom: 16px;
    justify-content: space-between;
}

h1 {
    color: #0650c0;
    border-color: black;
    font-family: system-ui;
    text-shadow: 7px 7px #dbecf1;
    padding: 0;
    width: 50% !important;
    position: relative;
}

.c-btn[data-v-fdacdde6] {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}

.c-btn strong {
    padding: 0;
    color: #043e96;
    width: 25px;
    display: inline;
    font-size: 1.05em;
}

.top {
    width: 95%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}

.second-header {
    width: 100%;
    background-color: #f7f6f6 !important;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
}

.search {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 50%;
    height: 35px;

}

.search-box {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    width: 100%;
}

.search-label {
    color: #043e96;
    width: 82px;
}

.search input {
    padding: 0;
    margin-right: 0;
    width: 335px;
}

.clear-button {
    margin-left: 10px !important;
}

.container {
    max-width: 100% !important;
    width: 100%;
    padding: 0;
    margin: 0;
    height: inherit;
}

.navbar {
    position: relative;
    left: 4.8%;
    padding: 0;
    top: -12px;
    max-width: 45%;
}

.navbar a {
    color: #516d9b !important;
    border-color: rgb(37, 54, 136) !important;
    font-family: system-ui !important;
    text-shadow: 1px 1px #dbecf1 !important;
    font-size: 1.15rem !important;
    margin: 0 !important;

}

.navbar a:hover {
    color: #0650c0 !important;
    border-color: black !important;
    font-family: system-ui !important;
    text-shadow: 7px 7px #dbecf1 !important;
    transform: scale(1.2);
}

div data-v-66231c30 {
    width: 100%;
}

.navbar[data-v-66231c30] a {
    color: #043e96 !important;
    border-color: rgb(182, 159, 159) !important;
    font-family: system-ui !important;
    text-shadow: 1px 1px #dbecf1 !important;
    font-size: 1.5rem !important;
}

b-table-sticky-header table-responsive-true {
    max-height: 55vh !important;
    position: fixed;
    top: 126px;
    right: 0;
    max-width: inherit;
    left: 0;

}

.mod {
    margin: 10px 5px 0 0 !important;

}

.lab {
    margin: 2px 2px 0 0;
    color: rgb(6, 6, 153);
}

.input {
    margin-top: 3px !important;
}

.navbar-brand {
    color: rgb(6, 6, 153) !important;
    text-decoration: none;
    font-family: inherit !important;
    font-weight: bold;
}

.bg-info {
    background-color: #f7f6f6 !important;
    width: auto !important;
}

.navbar-dark,
.navbar-nav,
.nav-link {
    color: rgb(6, 6, 153) !important;
    text-decoration: none !important;
    font-family: inherit !important;
    font-weight: bold !important;
}

.table td{
    vertical-align: middle !important;
}
.table th {
    padding: 0.4% !important;
    vertical-align: middle !important;
    border-top: 1px solid #dee2e6;
    text-align: center !important;
}

.form-inline {
    width: 100%;
    justify-content: space-between;
    margin-right: 20px;
    background-color: #f7f6f6 !important;
}

.btnppal {
    height: 56px;
    font-weight: bold;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.c-btn {
    display: flex;
    flex-direction: column;
}

.table-results {
    display: flex;
    flex-flow: column nowrap;
    align-content: center;
    justify-content: center;
    position: absolute;
    z-index: 3;
    right: 43px;
    border: 1px solid ivory;
    background-color: ivory;
    width: 342px;
}

.span-results:hover {
    background-color: #dbecf1;
    cursor: pointer;
}

.footer {
    position: fixed;
    top: 87%;
    margin-top: 10px;
    display: inline-flex;
    max-width: 95%;
    max-height: 7%;
}
</style>
