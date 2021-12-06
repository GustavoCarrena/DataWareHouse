<template>
<div>
    <b-button size="sm" class="col-2 mr-2 addRegion-btn" variant="success" @click="showAddRegionModal({})">Nueva Región</b-button>

    <div v-for="region in regions" :key="region.region_id" class="region-container">

        <div class="region-buttons">
            <strong>{{region.region_name}}</strong>
            <b-button variant="success" @click="addContry(region.region_id)">Agregar País a la Región</b-button>
            <b-button @click="editRegion(region.region_id)">Editar Nombre Región</b-button>
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
        cancel() {
            this.$alertify.error('OPERACIÓN CANCELADA');
        },

        showAddRegionModal() {
            //   this.employeeSelected = employee;
            this.$bvModal.show("addRegionModal");
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
                throw new Error;
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
</style>
