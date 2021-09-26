import Vue from 'vue';
import router from '@/alert/router';
import App from '@/alert/App.vue';
import store from '@/store';
import '@/styles/popup.scss';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;
Vue.config.productionTip = false;


const div = document.createElement("div")
document.body.insertBefore(div, document.body.firstChild);


new Vue({
    el: div,
    store,
    router,
    render: h => h(App),
});


export default store
