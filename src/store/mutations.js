export default {
    ['INVERT'](state) {
        state.dark = !state.dark;
    },
    ['LOAD_INPUT'](state, { input }) {
        state.input = input;
    }
}