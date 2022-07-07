import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueToastify from "vue-toastify";

Vue.config.productionTip = false
Vue.use(VueToastify,{
  canPause:false,
  // duration:1500
  errorDuration:3000
});
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
