import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'


Vue.use(VueRouter)

const routes = [

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'login',
    meta: {
      requiresAuth: false
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      requiresAuth: false
    },
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/HomePage.vue'),
    meta: {
      requiresAuth: true
    },

  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async(to, from, next) => {
   await store.dispatch('checkSession')
  if (to.meta.requiresAuth) {
    
    if (store.state.isLoggedIn) {
      next()
    } else {
      next({ path: '/' })
    }
  } else {
    next()
  }
  // console.log(store.state.isLoggedIn)
  if (to.name == 'login' && store.state.isLoggedIn) {
    next({ path: '/home' })
  }

})


export default router
