import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VAnimateCss from 'v-animate-css';


Vue.config.productionTip = false

// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(VAnimateCss);

import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
