<template>
    <ul>
        <li v-for='result in results'>
            <p
                    class='solution'
                    @click='copy'
                    v-if='result && typeof result !== "function"'>
                {{ result }}
            </p>
            <br v-else>
            <div class='clear'></div>
        </li>
    </ul>
</template>

<script>
import { clipboard } from 'electron';
import { evaluate } from 'mathjs';

export default {
    name: 'solutions',
    computed: {
        results() {
            const state = {};
            const output = [];
            const input = this.$store.state.input.split('\n');
            input.forEach(line => {
                let solution;
                try {
                    solution = evaluate(line, state) || '';
                } catch (e) { /* do nothing */ }
                output.push(solution);
            });
            return output;
        }
    },
    methods: {
        copy: (event) => {
            const text = event.target.innerText;
            clipboard.writeText(text);
        }
    }
};
</script>