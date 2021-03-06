// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment'
import router from './router'

import ElementUI from 'element-ui'
import HttpClient from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

Vue.use(ElementUI)
Vue.use(HttpClient)

Vue.config.productionTip = false

// 全局过滤器 处理日期
Vue.filter('fmtDate', val => {
  return moment(val).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
