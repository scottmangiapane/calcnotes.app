import Vue from 'vue';

export default {
    ['INVERT'](state) {
        state.dark = !state.dark;
    }
}