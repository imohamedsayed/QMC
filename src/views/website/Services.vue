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
                    <v-row>
                        <v-col cols="12" md="4" lg="4" v-for="i in 6" :key="i">
                            <v-card class="service right pa-2" prepend-avatar="./logo.png">
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
                                    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima corrupti assumenda vitae enim incidunt
                                    maxime doloremque neque ea, ducimus a.</v-card-text
                                >
                                <v-btn elevation="0" class="text-primary">Learn more ..</v-btn>
                            </v-card>
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
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
import { IconUsersGroup } from '@tabler/icons-vue';
gsap.registerPlugin(ScrollTrigger);
const items = [
    {
        title: t('bread.services'),
        disabled: true,
        href: '/our-services'
    }
];

onMounted(() => {
    // animations
    window.scrollTo(0, 0);

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
});
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
</style>
