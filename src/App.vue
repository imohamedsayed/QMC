<template>
    <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;400;500;600;700;800;900;1000&display=swap');
html:lang(AR)* {
    font-family: 'Cairo';
}

.text-center {
    text-align: center !important;
}
body::-webkit-scrollbar {
    width: 15px;
}

body::-webkit-scrollbar-track {
    background: #fff;
}

body::-webkit-scrollbar-thumb {
    background: linear-gradient(#4b9f61, #367cb5);
    opacity: 0.4;
    border: 3px solid #fff;
    border-radius: 10px;
    transition: all 0.3s ease;
}

:root {
    --skin-color: #2a388a;
}
</style>
