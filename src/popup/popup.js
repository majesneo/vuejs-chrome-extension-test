import Vue from 'vue';
import router from '@/popup/router';
import App from '@/popup/App.vue';
import store from '@/store';
import '@/styles/popup.scss';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});



export default store;
