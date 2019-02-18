import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import ElementUI from 'element-ui'
// import '@/assets/custom-theme/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import Vant from 'vant';
import 'vant/lib/index.less';
import { Locale } from 'vant';
import zhCN from 'vant/lib/locale/lang/zh-CN';

// import '@/styles/vant.less'
// import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'


import '@/icons' // icon
import '@/permission' // permission control
Locale.use('zh-CN', zhCN);
// Vue.use(ElementUI, { locale })
Vue.use(Vant, { Locale });

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
