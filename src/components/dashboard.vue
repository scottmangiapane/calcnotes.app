<template>
    <div class='dashboard'>
        <div class='horizontal-full'>
            <editor class='horizontal-half'></editor>
            <div class='horizontal-half'>
                <textarea
                    v-model='results'
                    name='output'
                    readonly>
                </textarea>
            </div>
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
            let output = '';
            try {
                const input = this.$store.state.input;
                const solution = evaluate(input).entries || [];
                solution.forEach(item => {
                    if (typeof item !== 'function') {
                        output = output.concat(item);
                    }
                    output = output.concat('\n');
                });
            } catch (e) { /* do nothing */ }
            return output;
        }
    }
};
</script>