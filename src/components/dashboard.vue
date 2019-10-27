<template>
    <div class='dashboard'>
        <div class='horizontal-full'>
            <div class='horizontal-half'>
                <editor class='fill'></editor>
            </div>
            <div class='horizontal-half'>
                <solutions class='fill'></solutions>
            </div>
        </div>
    </div>
</template>

<script>
import editor from './editor.vue';
import solutions from './solutions.vue';

export default {
    name: 'dashboard',
    components: {
        editor,
        solutions
    }
};
</script>