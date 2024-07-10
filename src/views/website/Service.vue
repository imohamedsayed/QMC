<template>
    <div class="service py-10">
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
            <div class="title text-center animate__animated animate__backInDown mb-10">
                <p class="text-skin">{{ $t('services.title') }}</p>
            </div>

            <div class="service-content my-10 elevation-1">
                <div class="overlay"></div>
                <div class="content">
                    <div v-if="!loading">
                        <div v-if="service">
                            <h2 class="text-center mb-10 text-green">{{ service.name }}</h2>
                            <img
                                class="service-img left"
                                style="width: 100%; max-height: 400px"
                                :src="apiUrl + service.ImagePath + service.media?.name"
                            />
                            <div class="about-service">
                                <p class="about mb-10 mt-8 right">{{ $t('services.about') }}</p>
                                <div class="left px-4" style="line-height: 30px" v-html="service.description"></div>
                            </div>
                        </div>
                        <div v-else class="text-center not-found">
                            <img class="mx-auto text-center" width="500" src="../../assets/images/background/notFound.svg" />
                            <p class="font-weight-bold text-center" style="font-size: 1.2rem; text-align: center">
                                {{ $t('services.notFound') }}
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <h2 class="text-center mb-10 text-green skelton header"></h2>

                        <div class="skelton rectangle"></div>
                        <v-progress-linear color="skin" indeterminate class="my-7"></v-progress-linear>
                        <div class="about-service">
                            <p class="about mb-10 mt-8 right skelton title"></p>
                            <p class="left skelton paragraph"></p>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import axios from 'axios';
const { t } = useI18n({ useScope: 'global' });
gsap.registerPlugin(ScrollTrigger);

const apiUrl = import.meta.env.VITE_API_URL;

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const items = [
    {
        title: t('bread.services'),
        disabled: false,
        href: '/our-services'
    },
    {
        title: t('bread.service'),
        disabled: true,
        href: '/our-services'
    }
];

const service = ref(null);
const loading = ref(true);

onMounted(async () => {
    window.scrollTo(0, 0);
    try {
        axios.defaults.headers.common['Authorization'] = null;
        const res = await axios.get('api/sections/' + props.id);
        if (res.status == 200) {
            service.value = res.data.message;
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
.service {
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

    .about-service {
        margin-top: 10px;

        p {
            &.about {
                color: #4b9f61;
                font-weight: bold;
                font-size: 1.6rem;
            }
        }
    }
    .service-img {
        width: 100%;
        border-radius: 10px;
        height: auto;
        max-height: 400px;
        object-fit: cover;
        object-position: center;

        @media (max-width: 768px) {
            max-height: 300px;
        }

        @media (max-width: 576px) {
            max-height: 200px;
        }
    }
    hr {
        margin: 20px 0;
        background-color: #367cb5;
        height: 3px;
    }
    .service-content {
        position: relative;
        height: auto;
        position: relative;
        .overlay {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 20px;
            background: url('@/assets/images/abstract/abs.png') center no-repeat;
            background-size: cover;
            opacity: 0.3;
        }
        .content {
            padding: 20px;
            position: relative;
            z-index: 10;
            background: #ffffff9d;
            backdrop-filter: blur(4px);
            font-weight: 500;
            line-height: 22px;
            border-radius: 20px;
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
        height: 3%;
        width: 400px;
        margin: 0 auto;
        margin-bottom: 16px;
    }
    &.title {
        height: 20px;
        width: 400px;
        margin-bottom: 16px;
    }
    &.p {
        height: 20px;
        margin-bottom: 8px;
    }
    &.paragraph {
        margin-top: 10px;
        height: 400px;
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
