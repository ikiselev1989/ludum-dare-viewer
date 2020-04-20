import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueYandexMetrika from 'vue-yandex-metrika'

Vue.config.productionTip = false

Vue.use(VueYandexMetrika, {
    id: '61151863',
    env: process.env.NODE_ENV
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
