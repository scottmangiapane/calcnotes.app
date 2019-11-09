<template>
    <div class='bar center-content titlebar'>
        <p class='ellipsis'>{{ productName }}</p>
    </div>
</template>

<script>
export default {
    name: 'titlebar',
    computed: {
        productName() { return process.env.npm_package_build_productName }
    }
};
</script>