// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AuthService from '@/services/AuthService'
import axios from 'axios'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// Auth service is instantiated wherever it is used due to local storage of user info
const authService = new AuthService()

// set request interceptor so all http requests get appended with a token where needed
axios.interceptors.request.use(config => {
  if (authService.getToken() && !config.headers.common['Authorization']) {
    config.headers.common['Authorization'] = authService.getAuthBearer()
  }
  return config
})

// set response interceptor so all 401 http statuses get redirected to the login page
axios.interceptors.response.use(undefined, error => {
  if (error.response.status === 401) {
    authService.logout()
  }
  return Promise.reject(error)
})
