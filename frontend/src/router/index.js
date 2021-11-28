import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Employee from '../views/Employee.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee
  },

]

const router = new VueRouter({
  routes
})

export default router
