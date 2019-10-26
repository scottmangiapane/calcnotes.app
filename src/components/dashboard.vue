<template>
    <div class='dashboard'>
        <div class='horizontal-full'>
            <div class='horizontal-half'>
                <editor class='fill-height'></editor>
            </div>
            <div class='horizontal-half'>
                <textarea
                    v-model='results'
                    class='fill-height'
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
                    if (item != '[object Object]' && typeof item !== 'function') {
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