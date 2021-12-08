<template>
<div>
    <b-button size="sm" class="col-2 mr-2 addRegion-btn" variant="success" @click="showAddRegionModal({})">Nueva Región</b-button>

    <!-- <div v-for="region in regions" :key="region.region_id" class="region-container">

        <div class="region-buttons">
            <strong>{{region.region_name}}</strong>
            <b-button variant="success" @click="addContry(region.region_id)">Agregar País a la Región</b-button>
            <b-button @click="editRegion(region.id)">Editar Nombre Región</b-button>
        </div>

        <div v-for="country in region.countries" :key="country.country_id" class="country">
            <div>
                <p>País: {{country.country_name}}</p>
                <b-button @click="removeCountry(country.country_id)">Eliminar País</b-button>
                <b-button @click="editCountry(country.country_id)">Editar País</b-button>
            </div>
            <div v-for="city in country.cities" :key="city.city_id" class="city">
                <div>
                    <p>Ciudad: {{city.city_name}}</p>
                    <b-button @click="removeCity(city.city_id)">Eliminar Ciudad</b-button>
                    <b-button @click="editCity(city.city_id)">Editar Ciudad</b-button>
                </div>
            </div>
        </div>
    </div> -->

    <div v-for="region in regions" :key="region.region_id" class="region-container">

        <!-- <div class="region-buttons">
            <strong>{{region.region_name}}</strong>
            <b-button variant="success" @click="addContry(region.region_id)">Agregar País a la Región

            </b-button>
            <b-button @click="editRegion(region.id)">Editar Nombre Región</b-button>
        </div> -->

        <div>
            <strong>{{region.region_name}}</strong>
            <b-dropdown variant="success" id="dropdown-form" text="Alta de País" ref="dropdown" class="m-2 add-b-form-group">
                <b-dropdown-form>

                    <b-form-input name="countryId" v-model="newCountryId" id="dropdown-form" type="text" size="sm" placeholder="Nuevo Id País (*)" class="dropdown-form"></b-form-input>
                    <b-form-input v-model="newCountryNAme" id="dropdown-form" type="text" size="sm" placeholder="Nuevo Nombre de País"></b-form-input>
                    <b-button variant="success" size="sm" @click="addContry(region.region_id)">Crear</b-button> <br>
                    <small>(*) Obligatorio: Tres letras mayúsculas</small>
                </b-dropdown-form>

            </b-dropdown>
        </div>
        <div v-for="country in region.countries" :key="country.country_id" class="country">
            <div>
                <p>País: {{country.country_name}}</p>
                <b-button @click="removeCountry(country.country_id)">Eliminar País</b-button>
                <b-button @click="editCountry(country.country_id)">Editar País</b-button>
            </div>
            <div v-for="city in country.cities" :key="city.city_id" class="city">
                <div>
                    <p>Ciudad: {{city.city_name}}</p>
                    <b-button @click="removeCity(city.city_id)">Eliminar Ciudad</b-button>
                    <b-button @click="editCity(city.city_id)">Editar Ciudad</b-button>
                </div>
            </div>
        </div>
    </div>

    <b-modal class="addRegionModal" id="addRegionModal" title="Ingrese Nombre Región" hide-footer>
        <form>
            <label class="lab" for="name">* <strong>Nombre Región</strong></label>
            <input name="name" type="text" v-model="regionName" class="form-control input" />
            <b-button @click="$bvModal.hide('addRegionModal'), getRegionsData()" class="mt-3 mr-4 mod">
                Cancelar
            </b-button>
            <b-button @click="addRegion()" class="mt-3 mod" variant="success">crear
            </b-button>
        </form>
    </b-modal>

    <!-- <b-modal class="addCountryModal" id="addCountryModal" title="Ingrese Datos del País" hide-footer>
        <form>
            <label class="lab" for="coId">* <strong>Id de País</strong></label>
            <small><i> (Requerido: Tres letras en mayúsculas)</i></small>
            <input name="coId" type="number" v-model="newCountryId" class="form-control input" />
            <label class="lab" for="name"><strong>Nombre de País</strong></label>
            <input name="name" type="text" v-model="newCountryNAme" class="form-control input" />
            <b-button @click="$bvModal.hide('addRegionModal'), getRegionsData()" class="mt-3 mr-4 mod">
                Cancelar
            </b-button>
            <b-button @click="addRegion()" class="mt-3 mod" variant="success">crear
            </b-button>
        </form>
    </b-modal> -->

    <!-- <div class="mb-1">
     <b-button @click="showMsgBoxTwo">msgBoxOk with options</b-button>
     Return value: {{ String(boxTwo) }}
     </div> -->
    <!-- MODAL DE CONFIRMACION DE REGION CREADA  -->

</div>
</template>

<script>
export default {
    name: 'Regions',
    data() {
        return {
            regionName: '',
            regionId: '',
            newCountryId: '',
            newCountryNAme: '',
            regions: [{
                id: "",
                region_name: "",
                countries: [{
                    country_id: "",
                    country_name: "",
                    cities: [{
                            city_id: "",
                            city_name: "",
                        },
                        {
                            city_id: "",
                            city_name: "",
                        },
                    ]
                }, ]
            }, ]
        }
    },

    mounted() {
        this.getRegionsData();
    },

    methods: {

        success() {
            this.$alertify.success('OPERACIÓN EXITOSA');
        },

        cancel() {
            this.$alertify.error('OPERACIÓN CANCELADA');
        },

        showAddRegionModal() {
            this.$bvModal.show("addRegionModal");
        },

        showAddCountryModal() {
            this.$bvModal.show("addCountryModal");
        },

        async getRegionsData() {
            const url = "http://localhost:3000/regions/getAllRegionsData";
            try {
                const response = await fetch(url);
                const data = await response.json();
                this.regions = data.response;
            } catch (error) {
                error
            }
        },
        async addRegion() {
            try {
                const url = "http://localhost:3000/regions/createRegion";
                const payload = {
                    region_name: this.regionName
                };
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await response.json();
                this.regions = data.response;
                this.$bvModal.hide('addRegionModal')
                await this.getRegionsData();
            } catch (error) {
                error;
            }
        },

        async addContry(region_id) {


            //HACER VALIDACION DE CAMPOS DE LOS DOS IMPUTUS!!!!!
            


            try {
                const url = `http://localhost:3000/regions/addCountry/${region_id}`;
                const payload = {
                    id: this.newCountryId,
                    country_name: this.newCountryNAme
                };
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await response.json();
                this.regions = data.response;
                await this.getRegionsData();
                this.newCountryId = '';
                this.newCountryNAme = '';
                this.success()
            } catch (error) {
                error;
            }
        },

    },

};
</script>

<style>
.region {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    background-color: blueviolet;
}

.region-buttons {
    display: inline-flex;
    flex-flow: column nowrap;
    width: 14%;
    margin-top: 2%;
}

.country {
    border: 1px solid #ccc;
    padding: 10px;
    background-color: rgb(43, 144, 226);
    width: 44%;
    margin-left: 14%;
}

.city {
    border: 1px solid #ccc;
    padding: 10px;
    background-color: rgb(43, 226, 98);
    margin-left: 46%;
}

.add-b-form-group {
    width: 30% !important;
}

.dropdown-menu {
    width: -webkit-fill-available !important;
}
</style>
