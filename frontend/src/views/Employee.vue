<template>

  <div id="container" class="row p-6 container">
    <header>  
      
      <div class="first-header">
        <h1 class="row col-5">Gestion de Usuarios</h1>
        <b-nav class="navbar">
          <b-nav-item href="#">Contactos</b-nav-item>
          <b-nav-item href="http://localhost:8080/regions">Regiones</b-nav-item>
          <b-nav-item href="#">Compañias</b-nav-item>
          <b-nav-item href="http://localhost:8080">Salir</b-nav-item>
        </b-nav>
      </div>

      <div class="second-header">
        <b-button 
        size="sm" 
        class="col-2 mr-2 btnppal" 
        variant="success" 
        @click="showEdit({},'create')">
        Alta de Usuario
        </b-button>
        <div class="search">
          <div class="search-box">
            <label 
            class="search-label" 
            for="search">
            <strong> Busqueda</strong></label>
          </div>
          <div>
            <b-form-input 
            name="search"
            v-model="filter" 
            class="mr-sm-2" 
            type="search">
            </b-form-input>
          </div>
        </div>
      </div>
    </header>
  
    <b-table 
      bordered 
      ref="selectableTable" 
      hover 
      selectable 
      select-mode="multi" 
      responsive="true" 
      sticky-header="62vh"
      :filter="filter"
      :items="employees"
      :fields="fields"
      @row-selected="onRowSelected">
      <template 
        #cell(status)="{ rowSelected }">
        <input 
          name ="checkbox" 
          type="checkbox" 
          :checked="rowSelected" 
          disabled/>
      </template>
      <template #cell(actions)="row">
        <b-button
          variant="warning"
          size="sm"
          class="col-8 mr-2"
          @click="showEdit(row.item)">
          Editar
        </b-button>
      </template>
    </b-table>
    
    <div class="footer">
      <b-button 
      size="sm" 
      class="col-2 mr-2 btnppal" 
      variant="danger" 
      @click="showMsgBoxOne">
      Eliminar Seleccionados
      </b-button>
    
    <b-button 
      v-if="selected.length>0"
      size="sm" 
      class="col-2 mr-2 btnppal" 
      variant="outline-danger" 
      @click="clearSelected(), cancel()">
      <div class="c-btn">
      <span>Usuarios seleccionados : {{selected.length}}</span>
      <span>Cancelar Seleccion</span> 
      </div>
      </b-button>
    </div>

    <b-modal id="deleteInfo">
      Registro Eliminado Exitosamente
    </b-modal>
    <b-modal  
      class="editModal" 
      id="editModal" 
      title="Ingreso de Datos" 
      hide-footer>
      <form>
        <label class="lab" for="name" >* <strong>Nombre</strong></label>
        <input
          name="name"
          type="text"
          v-model="employeeSelected.firstname"
          class="form-control input"/>
        <label class="lab" for="lastname">* <strong>Apellido</strong></label>
        <input
          name="lastname"
          type="text"
          v-model="employeeSelected.lastname"
          class="form-control mt-3 input"/>
        <label class="lab" for="email">* <strong>Correo Electronico</strong></label>
        <small><i>  (Formato requerido : xxx@xxx.xxx)</i></small>
        <input
          name="email"
          type="text"
          v-model="employeeSelected.email"
          class="form-control mt-3 input"/>
        <label class="lab" for="role">* <strong>Permisos</strong></label>
        <b-form-select
          name="role"
          class="mt-3 input"
          v-model="employeeSelected.role_id"
          :options="[
            { value: 'USER', text: 'Usuario' },
            { value: 'ADMI', text: 'Usuario administrador' },
          ]">
        </b-form-select>
        <label class="lab" for="pass">* <strong>Contraseña</strong></label>
        <small><i>  (minimo 4 caracteres)</i></small>
        <input
          name="pass"
          type="text"
          v-model="employeeSelected.user_pass"
          class="form-control mt-3 input"/>
        <label class="lab" for="passrep">* <strong>Repetir Contraseña</strong></label>
        <small><i>  (debe coincidir con la contraseña)</i></small>
        <input
          name="passrep"
          type="text"
          v-model="employeeSelected.user_passrep"
          class="form-control mt-3 input"/>
        <b-button
          @click="$bvModal.hide('editModal'), getEmployees(), cancel()" 
          class="mt-3 mr-4 mod">
          Cancelar
        </b-button>
        <b-button
          v-if="modalMode === 'edit'"
          @click="updateEmployee()"
          class="mt-3 mod"
          variant="success">
          Actualizar
        </b-button>
        <b-button
          v-else
          @click="createEmployee()"
          class="mt-3 mod"
          variant="success"
          >crear
        </b-button>
        <small><i> (*) Campos obligatorios</i></small>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "Employee",
    data() {
      return {
        filter:'',
        boxOne: '',
        employees: [],
        filteredEmployees:[],
        selected: [],
        employeeSelected: {},
        modalMode: "edit",
        fields: [
          {
            key: "status",
            label:"",
          },
          {
            key: "id",
            sortable: true,
          },
          {
            key: "firstname",
            sortable: true,
            label: "Nombre",
          },
          {
            key: "lastname",
            sortable: true,
            label: "Apellido",
          },
          {
            key: "email",
            sortable: true,
            label: "Correo",
          },
          {
            key: "role_description",
            sortable: true,
            label: "Permisos",
          },
          {
            key: "actions",
            sortable: false,
            label: "Modificar Datos",
          },
        ],
      };
    },
  mounted() {
    this.getEmployees();
  },
  
  methods: {
    
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
        const isSelected = this.selected.map(e=>e.id).length
        value === true && isSelected > 0 ? 
        (this.deleteEmployeesById() , this.success()):
        isSelected == 0 ? this.$bvModal.msgBoxOk('Debe seleccionar al menos 1 registro para eliminar'):
        this.cancel()
      })
      .catch(err => {err});
  },

    showEdit(employee, mode = "edit") {
      this.modalMode = mode;
      this.employeeSelected = employee;
      this.$bvModal.show("editModal");
    },

    onRowSelected(items) {
      this.selected = items;
    },

    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    
    getDuplicatedEmail(){
      const dataTable = this.employees.map(e=>e.email)
      const emailInsert = this.employeeSelected.email
      return dataTable.includes(emailInsert)
    },

    disableSubmit () {
      const firstname = this.employeeSelected.firstname
      const lastname = this.employeeSelected.lastname
      const email = this.employeeSelected.email;
      const emailRules = /.+@.+/.test(email);
      const role = this.employeeSelected.role_id
      const pass = this.employeeSelected.user_pass
      const passrep = this.employeeSelected.user_passrep;
      return  !firstname || !lastname || !email || !role ||  pass !== passrep || pass.length < 4 || emailRules === false
    },

    validateNewEmail (oldEmail, newEmail) {
      const searchEmail = oldEmail.reduce((acc, users)=>{
      acc[users.email] = ++acc[users.email] || 0;
      return acc
      },{});
      let duplicatedEmail = oldEmail.filter((user)=>{
        return searchEmail[user.email]
      });
      const duplicatedEmailMap = duplicatedEmail.map(e=>e.email).find(e=>e === newEmail)
      for (let i = 0; i < duplicatedEmail.length; i++) {
          if (duplicatedEmailMap !== undefined ) {
          return true;
          } 
      }
    },

    async getEmployees () {
      const url = "http://localhost:3000/employees/employeesData";
      try {
        const response  = await fetch(url);
        const data = await response.json();
        this.employees = data.response
      } catch (error) {
        error
      }
    },

    async createEmployee() {
      const formatDataValidate = this.disableSubmit()
      const duplicatedEmail = this.getDuplicatedEmail()
      if (!formatDataValidate && !duplicatedEmail) {
        try {
          const url = "http://localhost:3000/employees/addEmployees";
          const response = await fetch(url, 
            {
            method: "POST",
            body: JSON.stringify(this.employeeSelected),
            headers: {
              "Content-Type": "application/json",
            },
          });
          await response.json()
          this.getEmployees();
          this.$bvModal.hide("editModal");
          this.success()
        } catch (error) {error}
      } else{
          duplicatedEmail ? 
          this.$bvModal.msgBoxOk(`El email "${this.employeeSelected.email}" ya se encuentra registrado`):
          this.$bvModal.msgBoxOk('Alguno de los formatos requeridos no son válidos o existen campos vacíos');
      }
    },
    
    async updateEmployee() {
      const formatDataValidate = this.disableSubmit()
      if (this.validateNewEmail(this.employees, this.employeeSelected.email) == true) {
        this.$bvModal.msgBoxOk(`El email "${this.employeeSelected.email}" ya se encuentra registrado`)
      }
        else if (!formatDataValidate) {
          try {
            const url = `http://localhost:3000/employees/updateEmployeesData/${this.employeeSelected.id}`;
            await fetch(url, 
            {
            method: "PUT",
            body: JSON.stringify(this.employeeSelected),
            headers: { "Content-Type": "application/json" },
            });
              this.$bvModal.hide("editModal")
              await this.getEmployees()
              this.success()
          } catch (error) {
            error
          }
        } else{
            this.$bvModal.msgBoxOk('Alguno de los formatos requeridos no son válidos o existen campos vacíos');  
          }  
  },

    async deleteEmployee(id) {
      try {
        const url = `http://localhost:3000/employees/deleteEmployeesData/${id}`;
        await fetch(url,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        await this.getEmployees();
      } catch (error) {
        error
      }
    },

    deleteEmployeesById() {
      this.selected.forEach((employee) => this.deleteEmployee(employee.id));
    },
  },
};
</script>

<style scoped>

  header{
    width: 95vw;
    padding: 11px;
  }

  .first-header{
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
  };


  .top{
    width: 95%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .second-header{
    width: 100%;
    background-color: #f7f6f6 !important;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
  }

  .search{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 50%;
    height: 35px;
  
  }

  .search-box{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    width: 100%;
  }

  .search-label{
    color: #043e96;
    width: 82px;
  }

  .search input{
  padding: 0;
  margin-right: 0;
  width: 335px;
  }

  .clear-button{
    margin-left: 10px !important;
  }

  .container{
    max-width: 100% !important;
    width: 100%;
    padding: 0;
    margin: 0;
    height: inherit;
  }

  .navbar{
    position: relative;
    left: 4.8%;
    padding: 0;
    top: -12px;
    width: 45%;
  }

  .navbar a{
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
    transform:scale(1.2);
  }

  div data-v-66231c30{
    width: 100%;
  }
  
  .navbar[data-v-66231c30] a{
    color: #043e96 !important;
    border-color: rgb(182, 159, 159) !important;
    font-family: system-ui !important;
    text-shadow: 1px 1px #dbecf1 !important;
    font-size: 1.5rem !important;
  }

  b-table-sticky-header table-responsive-true{
      max-height: 55vh !important;
      position: fixed;
      top: 126px;
      right: 0;
      max-width: inherit;
      left: 0;

  }

  .mod{
    margin: 10px 5px 0 0 !important;

  }

  .lab{
    margin: 2px 2px 0 0;
    color: rgb(6, 6, 153);
  }

  .input{
    margin-top: 3px !important;
  }

  .navbar-brand{
    color: rgb(6, 6, 153) !important;
    text-decoration: none;
    font-family: inherit !important;
    font-weight: bold;
  }

  .bg-info {
      background-color: #f7f6f6 !important;
      width: auto !important;
  }

  .navbar-dark, .navbar-nav, .nav-link {
        color: rgb(6, 6, 153) !important;
    text-decoration: none !important;
    font-family: inherit !important;
    font-weight: bold !important;
  }

  .table td, .table th {
      padding: 0.4% !important;
      vertical-align: middle !important;
      border-top: 1px solid #dee2e6;
      text-align: center !important;
  }

  .form-inline{
      width: 100%;
      justify-content: space-between;
      margin-right: 20px;
      background-color: #f7f6f6 !important;
  }

  .btnppal{
    height: 56px;
    font-weight: bold;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .c-btn{
    display: flex;
    flex-direction: column;
  }

  .table-results{
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

  .span-results:hover{
    background-color: #dbecf1;
    cursor: pointer;
  }

  .footer{
  position: fixed;
  top: 87%;
  margin-top: 10px;
  display: inline-flex;
  max-width: 95%;
  max-height: 7%;
  }


</style>
