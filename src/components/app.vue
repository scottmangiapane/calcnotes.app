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
            verify.update(JSON.stringify(this.$store.state.license.data));
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
                Buffer.from(this.$store.state.license.signature, 'hex')
            );
        }
    },
    mounted() {
        ipcRenderer.on('invert', () => {
            this.$store.commit('INVERT');
        });
        setTimeout(() => {
            if (!this.validKey && !Math.floor(Math.random() * 3)) {
                remote.dialog.showMessageBox({
                    message: `Thanks for using ${ process.env.npm_package_build_productName }! If y`
                            + `ou enjoy this app, please purchase a license key. You don't need a l`
                            + `icense key to continue using this app but it is appreciated as it he`
                            + `lps support my work. It will also remove this popup.`
                });
            }
        }, 0);
    }
};
</script>
