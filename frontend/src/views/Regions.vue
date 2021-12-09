<template>
<div>
    
        <header>  
      
      <div class="first-header">
        <h1 class="row col-5">Gestion de Regiones, Países y Ciudades</h1>
        <b-nav class="navbar">
          <b-nav-item href="#">Contactos</b-nav-item>
          <b-nav-item href="http://localhost:8080/employee">Usuarios</b-nav-item>
          <b-nav-item href="#">Compañias</b-nav-item>
          <b-nav-item href="http://localhost:8080">Salir</b-nav-item>
        </b-nav>
      </div>

    </header>

    
    
    <div class="region-crud">
        <b-button size="sm" class="col-2 mr-2 addRegion-btn" variant="success" @click="showAddRegionModal({})">Nueva Región</b-button>
    </div>
    <div v-for="region in regions" :key="region.region_id" class="region-container">

        <div class="inline-region-container">
            <strong class="region-text">{{region.region_name}}</strong>
            <b-button size="sm" class="col-2 mr-2 deleteRegion-btn" variant="danger" @click="removeRegion(region.region_id)">Eliminar Región</b-button>
            <b-dropdown variant="success" id="dropdown-form" text="Nuevo País" ref="dropdown" class="m-2 add-b-form-group add-country-bt">
                <b-dropdown-form>
                    <b-form-input name="countryId" v-model="newCountryId" type="text" size="sm" placeholder="Nuevo Id País (*)" class="dropdown-form"></b-form-input>
                    <b-form-input v-model="newCountryNAme" type="text" size="sm" placeholder="Nuevo Nombre de País"></b-form-input>
                    <b-button variant="success" size="sm" @click="addContry(region.region_id)">Crear</b-button> <br>
                    <small>(*) Obligatorio: Tres letras mayúsculas</small>
                </b-dropdown-form>
            </b-dropdown>
        </div>

        <div v-for="country in region.countries" :key="country.country_id" class="country">
            <div class="main-countries-btn">
                <div class="delete-country-btn">
                    País:<strong class="country-text">{{country.country_name}}</strong>
                    <b-button variant="danger" @click="removeCountry(country.country_id)">Eliminar País</b-button>
                </div>
                <div class="edit-country-containter">

                    <b-dropdown variant="warning" class="mx-1 edit-country-btn" text="Editar País">
                        <b-form-input class="edit-country-input" v-model="editCountryName" placeholder="Nuevo Nombre Pais"></b-form-input>
                        <b-button class="edit-country-sbtn" variant="success" @click="editCountry(country.country_id)">Editar</b-button>
                    </b-dropdown>
                </div>
            </div>

            <div class="new-citi-containter">
                <b-dropdown variant="success" class="mx-1 add-city-btn" text="Nueva Ciudad">
                    <b-form-input v-model="newCityName" type="text" size="sm" placeholder="Nombre de Ciudad"></b-form-input>
                    <b-button variant="success" size="sm" @click="addCity(country.country_id)">Crear</b-button>
                </b-dropdown>
            </div>

            <div v-for="city in country.cities" :key="city.city_id" class="city">

                <div class="city-container">
                    Ciudad: <strong class="city-text">{{city.city_name}}</strong>
                    <b-button class="remove-city-btn" variant="danger" @click="removeCity(city.city_id)">Eliminar Ciudad</b-button>
                    <div class="edit-city-containter">
                        <b-dropdown variant="warning" class="mx-1 add-city-btn" text="Editar Ciudad">
                        <b-form-input class="edit-city-input" v-model="editCityName" placeholder="Nuevo Nombre Ciudad"></b-form-input>
                        <b-button class="edit-city-btn" variant="success" @click="editCity(city.city_id)">Editar</b-button>
                        </b-dropdown>
                    </div>
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
            editCountryName: '',
            newCityName: '',
            editCityName: '',
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

        showAddRegionModal() {
            this.$bvModal.show("addRegionModal");
        },

        showAddCityModal() {
            this.$bvModal.show("addCityModal");
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

        async removeRegion(region_id) {
            
            try {
                const url = `http://localhost:3000/regions/deleteRegion/${region_id}`;
                const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                await response.json();
                await this.getRegionsData();
                this.$alertify.success(`Region '${region_id}' eliminada exitosmente`);
            } catch (err) {
                err
            }
        },

        async addContry(region_id) {
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
                if (data.status == 400) {
                    this.$bvModal.msgBoxOk(data.response);
                    this.$alertify.error('OPERACIÓN CANCELADA')
                } else {
                    this.regions = data.response;
                    await this.getRegionsData();
                    this.newCountryId = '';
                    this.newCountryNAme = '';
                    this.$alertify.success('OPERACIÓN EXITOSA');
                }
            } catch (err) {
                err
            }
        },

        async removeCountry(country_id) {
            try {
                const url = `http://localhost:3000/regions/deleteCountry/${country_id}`;

                const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                await response.json();
                await this.getRegionsData();
                this.$alertify.success(`País '${country_id}' eliminado Exitosmente`);
            } catch (err) {
                err
            }
        },

        async editCountry(country_id) {
            try {
                const url = `http://localhost:3000/regions/updateCountry/${country_id.toUpperCase()}`;
                const payload = {
                    country_name: this.editCountryName
                };
                const response = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const data = await response.json();
                if (data.status == 400) {
                    this.$bvModal.msgBoxOk(data.response);
                    this.$alertify.error('OPERACIÓN CANCELADA')
                } else {
                    await this.getRegionsData()
                    this.$bvModal.msgBoxOk('Pais editado exitosamente');
                    this.editCountryName = '';
                    this.$alertify.success('OPERACIÓN EXITOSA');

                }

            } catch (error) {
                error
            }

        },

        async addCity(country_id) {
            try {
                const url = `http://localhost:3000/regions/addCity/${country_id.toUpperCase()}`;
                const payload = {
                    city_name: this.newCityName
                };
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await response.json();
                if (data.status == 400) {
                    this.newCityName = '';
                    this.$bvModal.msgBoxOk(data.response);
                    this.$alertify.error('OPERACIÓN CANCELADA')
                } else {
                    await this.getRegionsData();
                    this.newCityName = '';
                    this.$bvModal.msgBoxOk(`Ciudad creada exitosamente`);
                    this.$alertify.success('OPERACIÓN EXITOSA');
                }
            } catch (err) {
                err
            }
        },

        async removeCity(city_id) {
            try {
                const url = `http://localhost:3000/regions/deleteCity/${city_id}`;
                const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                await response.json();
                await this.getRegionsData();
                this.$alertify.success(`Ciudad '${city_id}' eliminada exitosmente`);
            } catch (err) {
                err
            }
        },


        async editCity(city_id) {
            
            try {
                const url = `http://localhost:3000/regions/updateCity/${city_id}`;
                const payload = {
                    city_name: this.editCityName
                };
                const response = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const data = await response.json();
                if (data.status == 400) {
                    this.$bvModal.msgBoxOk(data.response);
                    this.$alertify.error('OPERACIÓN CANCELADA')
                } else {
                    await this.getRegionsData()
                    this.$bvModal.msgBoxOk('Pais editado exitosamente');
                    this.editCityName = '';
                    this.$alertify.success('OPERACIÓN EXITOSA');
                }
            } catch (error) {
                error
            }

        },

    },

};
</script>

<style>

  header{
    width: 95vw;
    padding: 11px;
  }

  .first-header{
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
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
  };

 .nav-link {
    display: block !important;
    padding: 0.5rem 1rem !important;
    color: #0d6efd !important;
    text-decoration: none !important;
    transition: color .15s ease-in-out;
    background-color: .15s ease-in-out;
    border-color: .15s ease-in-out;
   
}

  .navbar a{
    color: #516d9b !important;
    border-color: rgb(37, 54, 136) !important;
    font-family: system-ui !important;
    text-shadow: 1px 1px #dbecf1 !important;
    font-size: 1.70rem !important;
    margin: 0 !important;
  }


  .first-header ul li a:hover {
    color: #0650c0 !important;
    border-color: black !important;
    font-family: system-ui !important;
    text-shadow: 7px 7px #dbecf1 !important;
    transform:scale(1.2);
  }

.region-crud {
    margin-top: 10px;
}

.inline-region-container {
    display: flex;
    flex-flow: row nowrap;
    margin-top: 30px;
    justify-content: flex-start;
    align-items: center;
    background-color: rgb(124, 182, 184);
}

.region-text {
    font-size: 36px;
    color: azure;
    margin: 0 5px;
}

.deleteRegion-btn{
    margin-left: 10px;
    height: 40px;
}

.region-buttons {
    display: inline-flex;
    flex-flow: column nowrap;
    width: 14%;
    margin-top: 2%;
}

.country {
    border: 1px solid grey;
    padding: 10px;
    background-color: lightgray;
}

.edit-country-btn {
    padding: 0 1% !important;
    width: 100% !important;
}

.edit-city-btn {
    padding: 0 1% !important;
    width: 18% !important;
}

.country-text {
    font-size: 20px;
    margin: 0 5px;
}

.main-countries-btn {
    width: 40%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
}

.add-city-btn {
    margin-left: 30% !important;
    width: 70%;
}

.city-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
}

.city {
    border: 1px solid #ccc;
    padding: 10px;
    background-color: darkgray;
    margin-left: 30%;
    width: 70%;
}

.city-text {
    margin: 0 20px 0 10px;
    font-size: 15px;
    width: 30%;
}

.edit-city-containter {
    width: 44%;
}

.edit-city-input {
    width: 100%;
    padding: 4px;
    margin-bottom: 5px;
}

.edit-country-input {
    width: 100%;
    padding: 1px;
    margin-bottom: 5px;
}

.edit-city-btn {
    width: 148px !important;
}

.add-b-form-group {
    width: 30% !important;
}

.dropdown-menu {
    width: -webkit-fill-available !important;
}

.delete-country-btn {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
}

p {
    margin: 0 10px 0 5px;
}

.edit-country-containter {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: start;
    margin-bottom: 10px;
    width: 270px;
}

.btn-warning {
    height: 35px !important;
}
</style>
