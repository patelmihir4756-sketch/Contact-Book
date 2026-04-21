import { createRouter, createWebHistory } from 'vue-router'
import ContactListView from '../views/ContactListView.vue'
import ContactDetailsView from '../views/ContactDetailsView.vue'
import ContactFormView from '../views/ContactFormView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ContactListView
  },
  {
    path: '/contacts/new',
    name: 'contact-create',
    component: ContactFormView
  },
  {
    path: '/contacts/:id',
    name: 'contact-details',
    component: ContactDetailsView,
    props: true
  },
  {
    path: '/contacts/:id/edit',
    name: 'contact-edit',
    component: ContactFormView,
    props: true
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})
