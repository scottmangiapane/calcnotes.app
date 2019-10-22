<template>
    <codemirror v-model="code" v-bind:options="editorOptions"></codemirror>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import { codemirror } from 'vue-codemirror';

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
                lineWrapping: true,
                mode: 'text/x-sql',
                theme: 'custom'
            }
        };
    }
};
</script>