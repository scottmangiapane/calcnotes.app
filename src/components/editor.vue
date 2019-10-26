<template>
    <codemirror
        v-model='code'
        :options='editorOptions'
        @input='loadResults'>
    </codemirror>
</template>

<script>
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import { codemirror } from 'vue-codemirror';
import { mapActions } from 'vuex';

export default {
    name: 'editor',
    components: {
        codemirror
    },
    data() {
        return {
            code: 'const a = 10;',
            editorOptions: {
                autofocus: true,
                lineNumbers: true,
                lineWrapping: true,
                mode: 'text/javascript',
                smartIndent: false,
                theme: 'custom'
            }
        };
    },
    methods: {
        loadResults: (code) => {
            loadResults(code);
        }
    },
    methods: mapActions(['loadResults'])
};
</script>