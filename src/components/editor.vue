<template>
    <codemirror
        v-model='code'
        :options='editorOptions'
        @input='loadInput'>
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
            code: '',
            editorOptions: {
                autofocus: true,
                lineNumbers: true,
                mode: 'text/javascript',
                smartIndent: false,
                theme: 'custom'
            }
        };
    },
    methods: mapActions(['loadInput'])
};
</script>