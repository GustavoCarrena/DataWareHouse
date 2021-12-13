import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Employee from '../views/Employee.vue'
import Regions from '../views/Regions.vue'
import Contacts from '../views/Contacts.vue'
import Companies from '../views/Companies.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/employee',
    name: 'employee',
    component: Employee
  },
  {
    path: '/regions',
    name: 'regions',
    component: Regions
  },
  {
    path: '/contacts',
    name: 'contact',
    component: Contacts
  },
  {
    path: '/companies',
    name: 'companies',
    component: Companies
  },  
  {
    path: '/',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
