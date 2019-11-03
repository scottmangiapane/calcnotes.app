<template>
    <div id='app' :class='{dark}'>
        <titlebar></titlebar>
        <dashboard :class='{"dashboard-small": !validKey}'></dashboard>
        <banner v-if=!validKey></banner>
    </div>
</template>

<script>
import crypto from 'crypto';
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
        validKey() {
            const verify = crypto.createVerify('SHA256');
            verify.update(this.$store.state.email);
            verify.end();
            return verify.verify(
                crypto.createPublicKey(
                        '-----BEGIN PUBLIC KEY-----\n'
                        + 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnGC0SN7I0TeUL6k+lpx7\n'
                        + '0PJxWh6tvYQqVX/ftcgGr+4OOa1Qyk4m92BQuXgOw2/aksmYnsMsE//m1AToSIM6\n'
                        + '0EhwOPBFthqS74HClb761/loC7bR2myN9zIl6pkPGpw6I6EhWZFTzd9/pFGUvzRr\n'
                        + 'oWUYwbIZ07gk3822BKZVCIjYgK8IMU/7G/vCElQ/DpJkIUW0c9jz3PDHmVei2lyn\n'
                        + '7XZ4MyAMYIA7bq9gi+yL2yAyrrlcuqGnHZ01yoO8OGMcwvFZWH1yXX7gzvSYI/tO\n'
                        + 'A2crSKBZEIEB07HBt8+R2rRP8Ig9IiZmwkpTJnspXOkGEiXz5VNLM80mDf8XbQHA\n'
                        + '0wIDAQAB\n'
                        + '-----END PUBLIC KEY-----\n'
                ),
                Buffer.from(this.$store.state.signature, 'hex')
            );
        }
    },
    mounted() {
        ipcRenderer.on('invert', () => {
            this.$store.commit('INVERT');
        });
        setTimeout(() => {
            if (!this.validKey && !Math.floor(Math.random() * 5)) {
                remote.dialog.showMessageBox({
                    message: 'Thanks for using Calculator! If you enjoy this app, please purchase a'
                            + ' license key. You don\'t need a license key to continue using this a'
                            + 'pp but it is appreciated as it helps support my work. It will also r'
                            + 'emove this popup.'
                });
            }
        }, 0);
    }
};
</script>
