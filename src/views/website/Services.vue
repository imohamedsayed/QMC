<template>
    <div class="our-services py-10">
        <v-container>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-btn icon elevation="0" class="bg-background" to="/">
                        <v-icon class="mx-1" size="small" icon="mdi-home" color="skin"></v-icon>
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
            <div class="services my-10">
                <div class="title text-center animate__animated animate__backInDown">
                    <p class="text-skin">{{ $t('services.title') }}</p>
                </div>
                <div class="services-list mt-10">
                    <div v-if="!loading">
                        <v-row v-if="services.length">
                            <v-col cols="12" md="4" lg="4" v-for="service in services" :key="service.id">
                                <v-card
                                    class="service right pa-2"
                                    :prepend-avatar="apiUrl + logo.ImagePath + logo.media?.name"
                                    @click="$router.push('/our-services/' + service.id)"
                                >
                                    <img style="width: 100%; max-height: 400px" :src="apiUrl + service.ImagePath + service.media?.name" />

                                    <v-card-title class="text-skin font-weight-bold">{{ service.name }}</v-card-title>
                                    <v-card-text>{{ service.description.substring(0, 120) }}</v-card-text>
                                    <v-btn elevation="0" class="text-primary">{{ $t('services.learn') }}</v-btn>
                                </v-card>
                            </v-col>
                        </v-row>
                        <div v-else class="text-center not-found">
                            <img class="mx-auto text-center" width="500" src="../../assets/images/background/services.svg" />
                            <p class="font-weight-bold text-center" style="font-size: 1.2rem; text-align: center">
                                {{ $t('services.noServices') }}
                            </p>
                        </div>
                    </div>

                    <v-row v-else>
                        <v-progress-linear color="skin" indeterminate class="my-4"></v-progress-linear>

                        <v-col cols="12" md="4" lg="4" v-for="i in 6" :key="i">
                            <div class="skelton card"></div>
                        </v-col>
                    </v-row>
                </div>
                <img src="@/assets/images/abstract/services1.svg" class="liquid-shape" alt="" />
                <img src="@/assets/images/abstract/services1.svg" class="liquid-shape l2" alt="" />
            </div>
        </v-container>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import axios from 'axios';
import { useSettingsStore } from '@/stores/SettingsStore';
const settingsStore = useSettingsStore();

const logo = computed(() => settingsStore.getSettingByKey('logo'));

const { t } = useI18n({ useScope: 'global' });
gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        title: t('bread.services'),
        disabled: true,
        href: '/our-services'
    }
];
const apiUrl = import.meta.env.VITE_API_URL;

const loading = ref(true);
const services = ref([]);
onMounted(async () => {
    window.scrollTo(0, 0);

    try {
        axios.defaults.headers.common['Authorization'] = null;
        const res = await axios.get('api/services');
        if (res.status == 200) {
            services.value = res.data.services;
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
                x: -100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%',
                    end: 'bottom 20%'
                }
            });
        });
        gsap.utils.toArray('.right').forEach((box) => {
            gsap.from(box, {
                x: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%',
                    end: 'bottom 20%'
                }
            });
        });
    }, 100);
};
</script>

<style lang="scss" scoped>
.our-services {
    overflow-x: hidden;
    overflow-y: hidden;
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
    .services {
        position: relative;
        height: auto;
        .liquid-shape {
            position: absolute;
            top: 8%;
            width: 100%;
            z-index: 0;
            opacity: 0.15;
            &.l2 {
                top: auto;
                top: 50%;
                bottom: 0;
                display: none;
                @media (max-width: 900px) {
                    display: inline;
                }
            }
        }
        .services-list {
            position: relative;
            z-index: 10;
            .service {
                background: #ffffffa0;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(4px);
                &:hover {
                    transform: scale(1.05);
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

    &.card {
        margin-top: 10px;
        height: 300px;
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
    position: relative;
    z-index: 100;
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
