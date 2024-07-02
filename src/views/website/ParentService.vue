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
            <div v-if="!loading">
                <div class="title text-center animate__animated animate__backInDown mb-10">
                    <p class="text-skin">{{ $t('services.title') }}</p>
                </div>

                <div class="service-header px-8 elevation-1">
                    <div class="overlay"></div>
                    <v-row class="align-center content">
                        <v-col cols="12" md="6">
                            <img
                                class="left"
                                style="max-width: 400px; max-height: 400px"
                                src="https://st.depositphotos.com/1000423/1637/i/450/depositphotos_16370285-stock-photo-hand-pushing-on-a-touch.jpg"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="about-service right">
                                <p class="about">{{ $t('services.about') }}</p>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est aspernatur accusantium numquam sed,
                                    possimus quos debitis! Eos, possimus? Alias, praesentium eius error neque adipisci recusandae aliquid
                                    mollitia quibusdam repudiandae accusamus.
                                </p>
                            </div>
                        </v-col>
                    </v-row>
                </div>

                <hr />
                <div class="service-content my-10">
                    <div class="content">
                        <v-row>
                            <v-col cols="12" md="4" lg="4" v-for="i in 6" :key="i">
                                <v-card class="service right pa-2" @click="$router.push('/our-services/1/2')">
                                    <img
                                        style="width: 100%"
                                        src="https://st.depositphotos.com/1000423/1637/i/450/depositphotos_16370285-stock-photo-hand-pushing-on-a-touch.jpg"
                                    />
                                    <!-- <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </img> -->
                                    <v-card-title class="text-skin font-weight-bold">Service 1</v-card-title>
                                    <v-card-text
                                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima corrupti assumenda vitae enim
                                        incidunt maxime doloremque neque ea, ducimus a.</v-card-text
                                    >
                                    <v-btn elevation="0" class="text-primary">{{ $t('services.learn') }}</v-btn>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                    <img src="@/assets/images/abstract/services4.svg" class="liquid-shape" alt="" />
                    <img src="@/assets/images/abstract/services2.svg" class="liquid-shape l2" alt="" />
                </div>
            </div>
            <div v-else>
                <div class="skelton header"></div>
                <v-progress-linear color="skin" indeterminate class="my-7"></v-progress-linear>
                <div class="service-header px-8 elevation-1">
                    <div class="overlay"></div>
                    <v-row class="align-center content">
                        <v-col cols="12" md="6">
                            <div class="skelton card"></div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="about-service right">
                                <div class="skelton title"></div>
                                <div class="skelton card" style="height: 100px"></div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <hr class="my-10" />
                <div class="service-content my-10">
                    <div class="content">
                        <v-row>
                            <v-col cols="12" md="4" lg="4" v-for="i in 6" :key="i">
                                <div class="skelton card"></div>
                            </v-col>
                        </v-row>
                    </div>
                    <img src="@/assets/images/abstract/services4.svg" class="liquid-shape" alt="" />
                    <img src="@/assets/images/abstract/services2.svg" class="liquid-shape l2" alt="" />
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
const { t } = useI18n({ useScope: 'global' });
gsap.registerPlugin(ScrollTrigger);
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

const loading = ref(true);

onMounted(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
        loading.value = false;
        animations();
    }, 1000);
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
    .service-header {
        border-radius: 20px;
        position: relative;
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 20px;
            width: 100%;
            height: 100%;
            background: url('@/assets/images/abstract/abs.png') center no-repeat;
            background-size: cover;
            opacity: 0.1;
        }
        .content {
            position: relative;
            z-index: 10;
            img {
                width: 100%;
                height: auto;
                max-width: 400px;
                max-height: 400px;
                border-radius: 20px;
                object-fit: cover;
                object-position: center;

                @media (max-width: 768px) {
                    max-width: 300px;
                    max-height: 300px;
                }

                @media (max-width: 576px) {
                    max-width: 200px;
                    max-height: 200px;
                }
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
        .content {
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
    &.header {
        height: 20px;
        width: 400px;
        margin: 0 auto;
        margin-bottom: 16px;
    }
    &.title {
        height: 20px;
        width: 300px;
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
