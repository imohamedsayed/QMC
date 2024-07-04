<template>
    <div class="landing">
        <Intro />
        <div class="landing-content"></div>
    </div>
</template>

<script setup>
import Intro from '@/components/website/landing/Intro.vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref, watch } from 'vue';

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
    window.scrollTo(0, 0);

    //  animations
});
</script>

<style lang="scss" scoped>
.landing-content {
    height: auto;
    overflow-x: hidden;
    overflow-y: hidden;
}
</style>
