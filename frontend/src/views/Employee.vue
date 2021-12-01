<template>
  
  <div id="container" class="row p-6 container">
    
    <h1 class="row col-5">Gestion de Usuarios</h1>
    
    <div class="btnstop">
      <b-button 
      size="sm" 
      class="col-3 mr-2 btnppal" 
      variant="success" 
      @click="showEdit({},'create')">
      Alta de Usuario
      </b-button>
    </div>
    
    <b-table 
      bordered 
      ref="selectableTable" 
      hover 
      selectable 
      select-mode="multi" 
      responsive="true" 
      sticky-header="55vh" 
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
    
    <b-modal id="deleteInfo">
      Registro Eliminado Exitosamente
    </b-modal>

    <div class="btnCancelSel">
      <b-button 
        size="sm" 
        class="col-3 mr-2 btnppal" 
        variant="danger" 
        @click="showMsgBoxOne">
        Eliminar Usuarios Seleccionados
      </b-button>
      
      <b-button 
        size="sm" 
        class="col-3 mr-2 btnppal" 
        variant="outline-danger" 
        @click="clearSelected(), cancel()">
        Cancelar Seleccion Realizada
      </b-button>
    </div>

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
          >crear</b-button>
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
      
      boxOne: '',
      employees: [],
      selected: [],
      employeeSelected: {},
      modalMode: "edit",
      
      fields: [
        {
          key: "status",
          label: "",
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
          label: "Acciones",
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
      if (!this.disableSubmit()) {
          
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
          this.$bvModal.msgBoxOk('Alguno de los formatos requeridos no son válidos o existen campos vacíos')
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

h1 {
  color: #0650c0;
  border-color: black;
  font-family: system-ui;
  text-shadow: 7px 7px #dbecf1;
  margin: 25px 0 5px 0;
  padding: 0 0 0 1%;
};

.btnstop{
margin-bottom: 10px;
}

.btnppal{
  margin: 15px 0 15px 0;
  padding: 1%;
  font-weight: bold;
  margin-right: 1%;
}


</style>
