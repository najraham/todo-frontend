import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    // todos
    { path: '/todos', name: 'showTodos', component: require('./components/Todos.vue').default },
    
    // auth
    { path: '/login', name: 'showLogin', component: require('./components/Login.vue').default },
    
]
  

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router