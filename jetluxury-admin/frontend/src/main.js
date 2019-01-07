// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueGoogleCharts from 'vue-google-charts'
import { store } from './store'

// import VueCharts from 'vue-charts'

Vue.prototype.$http = axios
Vue.use(VueGoogleCharts)
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
// Vue.use(VueCharts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
