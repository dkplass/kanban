import '@babel/polyfill'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'normalize.css/normalize.css'
import '@/assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css

import VCalendar from 'v-calendar'
import i18n from './i18n'

import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VCalendar)

Vue.config.productionTip = false

export const app = new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
