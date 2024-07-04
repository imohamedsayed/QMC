<template>
    <div class="why-us" v-if="why.length">
        <div class="title text-center animate__animated animate__backInDown">
            <p class="text-skin">{{ $t('about.why') }}</p>
        </div>
        <v-row class="mt-8 align-center">
            <v-col cols="12" md="6" lg="4" v-for="(item, index) in why" :key="item.id">
                <v-card class="text-center mb-4 why-card" elevation="0">
                    <v-icon size="48" class="my-4" color="green">{{ 'mdi-' + item.icon }}</v-icon>
                    <v-card-title class="card-title">{{ item.name }}</v-card-title>
                    <v-card-text>{{ item.description }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <img src="@/assets/images/abstract/shape1.png" class="liquid-shape" alt="" />
    </div>
    <div class="" v-if="loading">
        <div class="skelton header mb-10 mt-5"></div>

        <v-row>
            <v-col cols="12" md="6" lg="4" v-for="i in 9" :key="i">
                <div class="skelton card"></div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { toast } from 'vue3-toastify';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const loading = ref(true);
const why = ref([]);
onMounted(async () => {
    window.scrollTo(0, 0);
    try {
        axios.defaults.headers.common['Authorization'] = null;
        const res = await axios.get('api/whyus');
        if (res.status == 200) {
            why.value = res.data.whyus;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    } finally {
        loading.value = false;
        animations();
    }
});

const animations = () => {
    setTimeout(() => {
        gsap.utils.toArray('.why-card').forEach((box) => {
            gsap.from(box, {
                x: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play reverse restart reverse'
                }
            });
        });
    }, 100);
};
</script>

<style lang="scss" scoped>
.why-us {
    position: relative;
    height: auto;
    .title {
        p {
            font-weight: bold;
            font-size: 2.6rem;
            position: relative;
            padding-bottom: 15px;
            &::after {
                content: '';
                height: 4px;
                background: linear-gradient(270deg, #4b9f61 0.08%, #367cb543 100%);
                width: 300px;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        @media (max-width: 1200px) {
            p {
                font-size: 2.4rem;
            }
        }

        @media (max-width: 992px) {
            p {
                font-size: 2.2rem;
            }
        }

        @media (max-width: 768px) {
            p {
                font-size: 2rem;
            }
        }

        @media (max-width: 576px) {
            p {
                font-size: 1.8rem;
            }
        }

        @media (max-width: 400px) {
            p {
                font-size: 1.6rem;
            }
        }
    }
    .v-card {
        transition: transform 0.2s;
        background: #ffffff8b;
        z-index: 10;
    }
    .v-card:hover {
        transform: scale(1.05);
    }
    .card-title {
        font-size: 18px;
        font-weight: bold;
        color: #367cb5;
        word-wrap: break-word;
        white-space: normal;
    }
    .v-card-text {
        color: #5a6a85;
    }
    .liquid-shape {
        position: absolute;
        top: 8%;
        width: 100%;
        z-index: 0;
        opacity: 0.15;
    }
}
.skelton {
    background: linear-gradient(to bottom right, rgba(187, 179, 179, 0.321), rgba(255, 254, 254, 0.096));
    border-radius: 10px;
    width: 100%;
    animation: shimmer 2s infinite;
    background-size: 200% 100%;
    &.header {
        height: 20px;
        width: 400px;
        margin: 0 auto;
        margin-bottom: 16px;
    }
    &.p {
        height: 20px;
        margin-bottom: 8px;
    }
    &.card {
        margin-top: 10px;
        height: 200px;
    }
    &.rectangle {
        margin-top: 10px;
        height: 200px;
    }
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
</style>
