import Settings from 'electron-store';
import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const settings = new Settings();

const state = {
    license: {
        data: {
            email: settings.get('license.data.email') || '',
            purchaseIp: settings.get('license.data.purchaseIp') || '',
            purchaseDate: settings.get('license.data.purchaseDate') || '',
            majorVersion: settings.get('license.data.majorVersion') || ''
        },
        signature: settings.get('license.signature') || ''
    },
    dark: settings.get('dark'),
    input: ''
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});