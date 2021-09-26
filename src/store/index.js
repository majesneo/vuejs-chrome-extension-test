import Vue from 'vue';
import Vuex from 'vuex';
import {getData} from "../popup/api/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        sites: null
    },
    getters: {
        sites: state => state.sites
    },
    mutations: {
        setSitesSoftomate(state, sites) {
            state.sites = sites;
        }
    },
    actions: {
        async getSitesSoftomate({commit}) {
            const sites = await getData('https://www.softomate.net/ext/employees/list.json')
            commit('setSitesSoftomate', sites);
        },
    },
});
