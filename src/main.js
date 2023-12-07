import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
//install bootstrap first
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapVue from "bootstrap-vue";


Vue.config.productionTip = false

Vue.use(BootstrapVue);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is a redirect to the login page
    const err_message = error.response.data.message;
    if (error.response.status === 401 && err_message !== 'Invalid Credentials') {
      console.log('Redirect to login detected');
      // Redirect to the home page or any other desired page
      router.push('/');
    }
    return Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
