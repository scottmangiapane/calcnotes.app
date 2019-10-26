<template>
    <div id='app' :class='{dark}'>
        <titlebar></titlebar>
        <dashboard></dashboard>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import dashboard from './dashboard.vue';
import titlebar from './titlebar.vue';

export default {
    name: 'app',
    components: {
        dashboard,
        titlebar
    },
    computed: {
        dark() {
            return this.$store.state.dark;
        }
    },
    mounted() {
        ipcRenderer.on('invert', () => {
            this.$store.commit('INVERT');
        });
    }
};
</script>