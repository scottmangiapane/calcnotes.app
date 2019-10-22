const Settings = window.require('electron-store');

import Vue from 'vue';
import Vuex from 'vuex';
import VueCodemirror from 'vue-codemirror';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
Vue.use(VueCodemirror, {});

const settings = new Settings();

const state = {
    dark: settings.get('dark')
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});