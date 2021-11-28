<template>
  <div class="row p-5">
    <h1>Employee</h1>
    <b-table 
      ref="selectableTable"
      striped 
      hover 
      selectable 
      select-mode="multi"
      :items="employees" 
      :fields="fields"      
      @row-selected="onRowSelected"
    >
      <template #cell(status)="{ rowSelected }">
          <input type="checkbox" :checked="rowSelected" disabled>
      </template>
      <template #cell(actions)="row">
          <b-button size="sm" class="col-3 mr-2" @click="showEdit(row.item)">Editar</b-button>
      </template>
    </b-table>
    <div class="row">
      <b-button size="sm" class="col-3 mr-2" @click="clearSelected()">Borrar Seleccion</b-button>
      <b-button size="sm" class="col-3 mr-2" @click="deleteEmployees()">Eliminar Empleados </b-button>
      <b-button size="sm" class="col-3" @click="showEdit({}, 'create' )">Crear Empleado </b-button>
    </div>
    <b-modal id="editModal" title="Editar Empleado" hide-footer>
        <p class="my-4">{{employeeSelected.firstname}} {{employeeSelected.lastname}}</p>
        <div>
          <input type="text" v-model="employeeSelected.firstname" class="form-control" placeholder="Nombre">
          <input type="text" v-model="employeeSelected.lastname" class="form-control mt-3" placeholder="Apellido">
          <input type="text" v-model="employeeSelected.email" class="form-control mt-3" placeholder="Email">
          <b-form-select class="mt-3" v-model="employeeSelected.role_id" :options="[{ value: 'USER', text: 'Usuario' },{ value: 'ADMI', text: 'administrador' },]"></b-form-select>
          <input type="text" v-model="employeeSelected.user_pass" class="form-control mt-3" placeholder="Passwords">
          <b-button @click="$bvModal.hide('editModal')" class="mt-3 mr-4">Cancelar</b-button>
          <b-button v-if="modalMode === 'edit'" @click="updateEmployee()" class="mt-3" variant="success">Actualizar</b-button>
          <b-button v-else @click="createEmployee()" class="mt-3" variant="success">crear</b-button>
        </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'Employee',
  data(){
    return{
      employees: [],
      fields:[
        {
          key: "status",
          label: "",
        },
        {
          key: "id",
          sortable: true
        },
        {
          key: "firstname",
          sortable: true,
          label: "Nombre"
        },
        {
          key: "lastname",
          sortable: true,
          label: "Apellido"
        },
        {
          key: "email",
          sortable: true,
          label: "Correo"
        },
        {
          key: "role_description",
          sortable: true,
          label: "Permisos"
        },
        {
          key: "actions",
          sortable: false,
          label: "Acciones"
        }
      ],
      selected: [],
      employeeSelected: {},
      modalMode:'edit'
    }
  },
  mounted(){
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      const url = 'http://localhost:3000/employees/employeesData'
      fetch(url)
          .then (response =>  response.json())
          .then(data => this.employees = data.response)
          .catch(error => error);
    },
    showEdit(employee, mode = 'edit'){
      this.modalMode = mode;
      this.employeeSelected = employee;
      this.$bvModal.show('editModal');
    },

    onRowSelected(items) {
      this.selected = items
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
    },
    deleteEmployees(){
      this.selected.forEach(employee => this.deleteEmployee(employee.id)) 
    },
    createEmployee(){
      const url = 'http://localhost:3000/employees/addEmployees'
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(this.employeeSelected),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.response){
          this.getEmployees();
          this.$bvModal.hide('editModal');
        }
      })
      .catch(error => error);
    },
    updateEmployee(){
      const url = `http://localhost:3000/employees/updateEmployeesData/${this.employeeSelected.id}`
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(this.employeeSelected),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(() => this.$bvModal.hide('editModal'))
      .catch(error => error);
    },
    deleteEmployee(id){
      const url = `http://localhost:3000/employees/deleteEmployeesData/${id}`
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => this.getEmployees())
      .catch(error => error);
    }
  },
}
</script>
<style scoped>
h1 {
  font-size: 1.5em;
  color: rgb(255, 0, 0);
  margin-bottom: 0;
}
</style>
