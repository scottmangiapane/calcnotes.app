<template>
    <div class="dashboard">
        <div class='horizontal-full'>
            <editor class='horizontal-half'></editor>
            <textarea class='horizontal-half' name='output' readonly></textarea>
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
    }
};
</script>