import Vue from 'vue'
import VueRouter from 'vue-router'
import Skull from '../components/Skull.vue'
import AppAccounts from '../components/AppAccounts.vue'
import AppUsers from '../components/AppUsers.vue'
import HomePage from '../components/HomePage.vue'
import AdminMenu from '../components/AdminMenu.vue'
import UserMenu from '../components/UserMenu.vue'
import TransactionsMenu from '../components/TransactionsMenu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  } ,
  {
    path: '/skull',
    name: 'Skull',
    component: Skull
  },
  {
    path: '/accounts',
    name: 'AppAccounts',
    component: AppAccounts
  },
  {
    path: '/users',
    name: 'AppUsers',
    component: AppUsers
  },
  {
    path: '/admin',
    name: 'AdminMenu',
    component: AdminMenu,
  },
  {
    path: '/menu',
    name: 'UserMenu',
    component: UserMenu,
  },
  {
    path: '/transactions',
    name: 'TransactionsMenu',
    component: TransactionsMenu,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
