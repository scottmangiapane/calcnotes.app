import Vue from 'vue';
import app from './components/app.vue';
import store from './store';

new Vue({
    el: 'app',
    store,
    components: { app }
});