<template>
    <div class='dashboard'>
        <div class='horizontal-full'>
            <editor class='horizontal-half'></editor>
            <textarea
                v-model='results'
                class='horizontal-half'
                name='output'
                readonly>
            </textarea>
        </div>
    </div>
</template>

<script>
import { evaluate } from 'mathjs';
import editor from './editor.vue';

export default {
    name: 'dashboard',
    components: {
        editor
    },
    computed: {
        results() {
            return this.$store.state.results;
        }
    }
};
</script>