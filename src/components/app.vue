<template>
    <div id='app' :class='{dark}'>
        <titlebar></titlebar>
        <dashboard :class='{"dashboard-small": trial}'></dashboard>
        <banner v-if=trial></banner>
    </div>
</template>

<script>
import { ipcRenderer, remote } from 'electron';

import banner from './banner.vue';
import dashboard from './dashboard.vue';
import titlebar from './titlebar.vue';

export default {
    name: 'app',
    components: {
        banner,
        dashboard,
        titlebar
    },
    computed: {
        dark() {
            return this.$store.state.dark;
        },
        trial() {
            return true;
        }
    },
    mounted() {
        ipcRenderer.on('invert', () => {
            this.$store.commit('INVERT');
        });
        setTimeout(() => {
            if (this.trial && !Math.floor(Math.random() * 3)) {
                remote.dialog.showMessageBox({
                    message: 'Thanks for using Calculator! If you enjoy this ap'
                            + 'p, please purchase a license key. You don\'t nee'
                            + 'd a license key to continue using this app but i'
                            + 't is appreciated as it helps support my work. It'
                            + ' will also remove this popup.'
                });
            }
        }, 0);
    }
};
</script>