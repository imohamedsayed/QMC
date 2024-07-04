<template>
    <div class="about my-10">
        <div class="about mt-10">
            <div class="title text-center animate__animated animate__backInDown mb-10">
                <p class="text-skin">{{ $t('about.about') }}</p>
            </div>
            <div class="about-box mb-10">
                <v-row class="align-center">
                    <v-col cols="12" md="6">
                        <v-img src="./images/about-1.svg" height="300px" class="left">
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template>
                        </v-img>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="text px-10 right">
                            <p :class="['title', 'font-weight-bold', 'text-green', 'mb-8', $i18n.locale === 'AR' ? 'ar' : '']">
                                {{ $t('about.who') }}
                            </p>
                            <p class="details">
                                {{ who.value }}
                            </p>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div class="about-box mb-10">
                <v-row class="align-center">
                    <v-col cols="12" md="6">
                        <div class="text px-10 left">
                            <p :class="['title', 'font-weight-bold', 'text-green', 'mb-8', $i18n.locale === 'AR' ? 'ar' : '']">
                                {{ $t('about.vision') }}
                            </p>
                            <p class="details">
                                {{ vision.value }}
                            </p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-img src="./images/vision.svg" height="300px" class="right">
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template>
                        </v-img>
                    </v-col>
                </v-row>
            </div>
            <div class="about-box mb-10">
                <v-row class="align-center">
                    <v-col cols="12" md="6">
                        <v-img src="./images/mission.svg" height="300px" class="left">
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template>
                        </v-img>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="text px-10 right">
                            <p :class="['title', 'font-weight-bold', 'text-green', 'mb-8', $i18n.locale === 'AR' ? 'ar' : '']">
                                {{ $t('about.mission') }}
                            </p>
                            <p class="details">
                                {{ mission?.value }}
                            </p>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <img src="@/assets/images/abstract/shape1.png" class="liquid-shape" alt="" />
        </div>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, computed } from 'vue';
gsap.registerPlugin(ScrollTrigger);

import { useSettingsStore } from '@/stores/SettingsStore';
const settingsStore = useSettingsStore();

const vision = computed(() => settingsStore.getSettingByKey('vision'));
const mission = computed(() => settingsStore.getSettingByKey('mission'));
const who = computed(() => settingsStore.getSettingByKey('who_are_you'));

onMounted(() => {
    setTimeout(() => {
        gsap.utils.toArray('.left').forEach((box) => {
            gsap.from(box, {
                x: -100,
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
        gsap.utils.toArray('.right').forEach((box) => {
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
    }, 500);
});
</script>

<style lang="scss" scoped>
.about {
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
    position: relative;
    height: auto;

    .liquid-shape {
        position: absolute;
        top: 8%;
        width: 100%;
        z-index: 0;
        opacity: 0.15;
    }

    .about-box {
        background: #ffffff89;
        z-index: 10;
        position: relative;
        .title {
            font-size: 3rem;
            @media (max-width: 500px) {
                font-size: 2.5rem;
            }
            @media (max-width: 1200px) {
                font-size: 2.4rem;
            }

            @media (max-width: 992px) {
                font-size: 2.2rem;
            }

            @media (max-width: 768px) {
                font-size: 2rem;
            }

            @media (max-width: 576px) {
                font-size: 1.8rem;
            }

            @media (max-width: 400px) {
                font-size: 1.6rem;
            }
            position: relative;
            padding-bottom: 10px;
            &::after {
                content: '';
                position: absolute;
                background: #367cb5;
                width: 200px;
                height: 2px;
                left: 1%;
                bottom: 0;
            }
            &.ar {
                &::after {
                    left: auto;
                    right: 1%;
                }
            }
        }
    }
}
</style>
