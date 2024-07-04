<template>
    <div class="process mb-15 py-10">
        <v-container>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-btn icon elevation="0" class="bg-background" to="/">
                        <v-icon class="mx-1" size="small" icon="mdi-home" color="blueLogo"></v-icon>
                    </v-btn>
                    <v-icon icon="mdi-chevron-right" v-if="$i18n.locale === 'EN'"></v-icon>
                    <v-icon icon="mdi-chevron-left" v-else></v-icon>
                </template>
                <template v-slot:divider v-if="$i18n.locale === 'EN'">
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
                <template v-slot:divider v-else>
                    <v-icon icon="mdi-chevron-left"></v-icon>
                </template>
            </v-breadcrumbs>

            <div class="our-process my-10" v-if="!loading">
                <div v-if="processes.length">
                    <div class="process-box mb-5" v-for="(process, i) in processes" :key="process.id">
                        <v-row class="align-center">
                            <v-col cols="12" md="6" :class="['right', i % 2 == 0 ? 'order-0' : 'order-1']">
                                <v-img :src="apiUrl + process.ImagePath + process.media?.name" height="400px">
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </v-col>
                            <v-col cols="12" md="6" class="left">
                                <div class="px-4">
                                    <p class="title mb-4">{{ process.name }}</p>
                                    <p class="text">
                                        {{ process.description }}
                                    </p>
                                </div>
                            </v-col>
                        </v-row>
                        <v-divider class="my-5"></v-divider>
                    </div>
                </div>
                <div v-else class="text-center not-found">
                    <img class="mx-auto text-center" width="500" src="../../assets/images/background/process.svg" />
                    <p class="font-weight-bold text-center" style="font-size: 1.2rem; text-align: center">
                        {{ $t('process.noProcesses') }}
                    </p>
                </div>
            </div>
            <div class="my-10" v-else>
                <v-progress-linear color="skin" indeterminate></v-progress-linear>
                <div class="box mb-10" v-for="i in 5" :key="i">
                    <v-row class="align-center">
                        <v-col cols="12" md="6" :class="i % 2 == 0 ? 'order-1' : 'order-0'">
                            <div class="skelton image"></div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="skelton p"></div>
                            <div class="skelton card"></div>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        title: t('bread.process'),
        disabled: true,
        href: 'process'
    }
];

const loading = ref(true);
const processes = ref([]);
onMounted(async () => {
    window.scrollTo(0, 0);
    try {
        axios.defaults.headers.common['Authorization'] = null;
        const res = await axios.get('api/processes');
        if (res.status == 200) {
            processes.value = res.data.processes;
            console.log(processes.value);
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
        gsap.utils.toArray('.left').forEach((box) => {
            gsap.from(box, {
                x: 400,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%',
                    toggleActions: 'play reverse restart reverse'
                }
            });
        });
        gsap.utils.toArray('.right').forEach((box) => {
            gsap.from(box, {
                x: -400,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%',
                    toggleActions: 'play reverse restart reverse'
                }
            });
        });
    }, 100);
};
</script>

<style lang="scss" scoped>
.process {
    .our-process {
        overflow-x: hidden;
        .process-box {
            p {
                &.title {
                    color: #4b9f61;
                    font-size: 20px;
                    font-weight: bold;
                }
                &.text {
                    color: #5a6a85;
                    font-size: 16px;
                }
            }
        }
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
        height: 150px;
    }
    &.image {
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
.not-found {
    text-align: center;
    p {
        text-align: center;
    }
    img {
        @media (max-width: 500px) {
            width: auto !important;
        }
    }
}
</style>
