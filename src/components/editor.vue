<template>
    <codemirror
            v-model='code'
            :options='options'
            @input='loadInput'>
    </codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import { mapActions } from 'vuex';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';

export default {
    name: 'editor',
    components: {
        codemirror
    },
    data() {
        return {
            code: '',
            options: {
                autofocus: true,
                mode: 'text/javascript',
                smartIndent: false,
                theme: 'custom'
            }
        };
    },
    methods: mapActions(['loadInput'])
};
</script>