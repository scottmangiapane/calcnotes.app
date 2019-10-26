export default {
    ['INVERT'](state) {
        state.dark = !state.dark;
    },
    ['LOAD_RESULTS'](state, { results }) {
        state.results = results;
    }
}