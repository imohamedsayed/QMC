<template>
    <div class="about-us py-10">
        <v-container>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-btn icon elevation="0" class="bg-background" to="/">
                        <v-icon class="mx-1" size="small" icon="mdi-home" color="primary"></v-icon>
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
            <div class="title text-center animate__animated animate__backInDown">
                <p>{{ $t('about_us.why') }}</p>
            </div>

            <v-row class="mt-16">
                <v-col cols="12" md="4">
                    <v-card
                        elevation="0"
                        class="bg-transparent animate__animated animate__backInLeft"
                        style="background: transparent !important"
                    >
                        <template v-slot:prepend>
                            <v-avatar color="skin" size="45"><IconDevicesStar /></v-avatar>
                        </template>

                        <v-card-title class="mb-4" style="font-weight: bold; font-size: 1.6rem">{{ $t('about_us.hq') }}</v-card-title>

                        <v-card-text style="font-size: 1.2rem; line-height: 27px">{{ $t('about_us.hqt') }}</v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" class="middle-col">
                    <v-card
                        elevation="0"
                        class="bg-transparent animate__animated animate__backInLeft"
                        style="background: transparent !important"
                    >
                        <template v-slot:prepend>
                            <v-avatar color="skin" size="45"><v-icon size="25">mdi-cash-multiple</v-icon></v-avatar>
                        </template>

                        <v-card-title class="mb-4" style="font-weight: bold; font-size: 1.6rem">{{ $t('about_us.bp') }}</v-card-title>

                        <v-card-text style="font-size: 1.2rem; line-height: 27px">{{ $t('about_us.bpt') }}</v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card
                        elevation="0"
                        class="bg-transparent animate__animated animate__backInLeft"
                        style="background: transparent !important"
                    >
                        <template v-slot:prepend>
                            <v-avatar color="skin" size="45"><IconBrandApple /></v-avatar>
                        </template>

                        <v-card-title class="mb-4" style="font-weight: bold; font-size: 1.6rem">{{ $t('about_us.bb') }}</v-card-title>

                        <v-card-text style="font-size: 1.2rem; line-height: 27px">{{ $t('about_us.bbt') }}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <div class="title text-center mt-16">
                <p>{{ $t('about_us.about') }}</p>
            </div>

            <div class="d-flex mt-16 about-box">
                <div class="pa-10 text left">
                    <p :class="['box-title', $i18n.locale === 'AR' ? 'ar' : '']">{{ $t('about_us.who') }}</p>
                    <p :class="['mt-10 text-content']">
                        {{ $t('about_us.whoT') }}
                    </p>
                </div>
                <div class="img right">
                    <img src="@/assets/images/about/about-1.png" alt="" />
                </div>
            </div>

            <div class="d-flex mt-16 about-box">
                <div class="img left">
                    <img src="@/assets/images/about/about-2.png" alt="" />
                </div>
                <div class="pa-10 text right">
                    <p :class="['box-title', $i18n.locale === 'AR' ? 'ar' : '']">{{ $t('about_us.goal') }}</p>
                    <p :class="['mt-10 text-content']">
                        {{ $t('about_us.goalT') }}
                    </p>
                </div>
            </div>

            <div class="d-flex mt-16 about-box">
                <div class="pa-10 text left">
                    <p :class="['box-title', $i18n.locale === 'AR' ? 'ar' : '']">{{ $t('about_us.mission') }}</p>
                    <p :class="['mt-10 text-content']">
                        {{ $t('about_us.missionT') }}
                    </p>
                </div>
                <div class="img right">
                    <img src="@/assets/images/about/about-3.png" alt="" />
                </div>
            </div>

            <div class="title text-center mt-16">
                <p>{{ $t('about_us.team') }}</p>
            </div>

            <div class="team d-flex justify-space-between flex-lg-row flex-column">
                <div :class="['tem-member  text-center', , $i18n.locale == 'AR' ? 'ar' : '']">
                    <img src="@/assets/images/about/zedan.jpeg" alt="" style="width: 100%" />

                    <div class="info">
                        <p class="text-center">Ahmed Zedan</p>
                        <p class="text-center">CEO</p>
                    </div>
                </div>
                <div :class="['tem-member mt-5 text-center', , $i18n.locale == 'AR' ? 'ar' : '']">
                    <img src="@/assets/images/about/ali.jpeg" alt="" />

                    <div class="info">
                        <p class="text-center">Ali Al Hosainy</p>
                        <!-- <p>{{ $t('about_us.job') }}</p> -->
                    </div>
                </div>
                <div :class="['tem-member mt-10 text-center', , $i18n.locale == 'AR' ? 'ar' : '']">
                    <img src="@/assets/images/about/mohamed.jpeg" alt="" />

                    <div class="info">
                        <p class="text-center">Mohammed Maher</p>
                    </div>
                </div>
                <div :class="['tem-member mt-16 text-center', , $i18n.locale == 'AR' ? 'ar' : '']">
                    <img src="@/assets/images/about/ahmed.jpeg" alt="" />

                    <div class="info">
                        <p class="text-center">Ahmed Fouad</p>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
import { IconDevicesStar, IconBrandApple } from '@tabler/icons-vue';
gsap.registerPlugin(ScrollTrigger);
const items = [
    {
        title: t('bread.about'),
        disabled: true,
        href: 'about'
    }
];

onMounted(() => {
    // animations
    window.scrollTo(0, 0);
    gsap.utils.toArray('.tem-member').forEach((box) => {
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
});
</script>

<style lang="scss" scoped>
.about-us {
    overflow-x: hidden;
}
.title {
    p {
        font-weight: bold;
        font-size: 2.6rem;
        position: relative;
        padding-bottom: 15px;
        &::after {
            content: '';
            height: 4px;
            background: linear-gradient(270deg, #2a388a 0.08%, rgba(42, 56, 138, 0) 100%);
            width: 300px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}
.middle-col {
    border-right: 1px solid var(--skin-color);
    border-left: 1px solid var(--skin-color);
}

.about-box {
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    > div {
        width: 50%;
    }

    @media (max-width: 1279px) {
        > div {
            width: 100%;
        }

        flex-direction: column;
    }

    .box-title {
        font-size: 3rem;
        color: var(--skin-color);
        position: relative;
        padding-bottom: 10px;
        &::after {
            content: '';
            position: absolute;
            background: var(--skin-color);
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
    .img {
        height: 400px;
        overflow: hidden;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .text {
        background: #dedede;
        height: 400px;
        .text-content {
            font-size: 1.4rem;
        }
    }
}

.team {
    margin: 50px 0;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        background: var(--skin-color);
        height: 40px;
        width: 100%;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
    .tem-member {
        position: relative;
        border-top-left-radius: 23%;
        border-bottom-right-radius: 22%;
        overflow: hidden;
        &.ar {
            text-align: center !important;
            .info {
                p {
                    text-align: center !important;
                }
            }
        }
        img {
            width: 100%;
            height: 100%;
        }
        height: 400px;
        .info {
            border-top-left-radius: 40%;
            border-bottom-left-radius: 1%;
            text-align: center;
            position: absolute;
            font-weight: bold;
            padding: 10px;
            bottom: 0;
            background: white;
            width: 100%;
        }
    }
}
</style>
