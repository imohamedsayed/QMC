<template>
    <div class="our-clients py-10">
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

            <div class="clients my-10">
                <div class="title text-center animate__animated animate__backInDown">
                    <p class="text-skin">{{ $t('clients.title') }}</p>
                </div>
                <div class="clients-list mt-10" v-if="!loading">
                    <v-row>
                        <v-col cols="6" md="4" lg="3" v-for="i in 16" :key="i">
                            <div class="left">
                                <v-img :src="`./images/clients/${i}.jpg`">
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <div class="clients-list mt-10" v-else>
                    <v-progress-linear color="skin" indeterminate></v-progress-linear>

                    <v-row>
                        <v-col cols="6" md="4" lg="3" v-for="i in 12" :key="i">
                            <div class="left skelton image"></div>
                        </v-col>
                    </v-row>
                </div>
                <img src="@/assets/images/abstract/abs.png" class="liquid-shape" alt="" />
                <img src="@/assets/images/abstract/shape1.png" class="liquid-shape l2" alt="" />
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
        title: t('bread.clients'),
        disabled: true,
        href: '/our-clients'
    }
];
const loading = ref(true);
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
        animation();
    }, 1000);
    // animations
    window.scrollTo(0, 0);

    gsap.utils.toArray('.skelton').forEach((box) => {
        gsap.from(box, {
            x: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: 'top 80%',
                toggleActions: 'play reverse restart reverse'
            }
        });
    });
});
const animation = () => {
    setTimeout(() => {
        gsap.utils.toArray('.left').forEach((box) => {
            gsap.from(box, {
                x: -100,
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
.our-clients {
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
    .clients {
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
        .clients-list {
            position: relative;
            z-index: 10;
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

    &.image {
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
