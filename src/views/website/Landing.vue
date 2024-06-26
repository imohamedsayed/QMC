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
import axios from 'axios';
import { toast } from 'vue3-toastify';

gsap.registerPlugin(ScrollTrigger);

const loading = ref(false);

onMounted(async () => {
    window.scrollTo(0, 0);

    //  animations
});

function setupAnimations() {
    gsap.utils.toArray('.section-header').forEach((box) => {
        gsap.from(box, {
            x: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none'
            }
        });
    });
    gsap.utils.toArray('.section-header .text-h3').forEach((box) => {
        gsap.from(box, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
                trigger: box,
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none'
            }
        });
    });
    gsap.utils.toArray('.landing-section .announce').forEach((box) => {
        gsap.from(box, {
            x: -400,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none'
            }
        });
    });
    gsap.utils.toArray('.landing .products-swiper').forEach((box) => {
        gsap.from(box, {
            y: 400,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: 'top 94%',
                end: 'bottom 20%',
                toggleActions: 'play none'
            }
        });
    });
}
</script>

<style lang="scss" scoped>
.landing-content {
    height: auto;
    overflow-x: hidden;
    overflow-y: hidden;
}
</style>
