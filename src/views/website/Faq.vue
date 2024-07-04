<template>
    <div class="faq py-10">
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

            <div class="faqs my-10">
                <div class="title text-center animate__animated animate__backInDown">
                    <p class="text-skin">{{ $t('faq.title') }}</p>
                </div>
                <div class="faqs-list mt-10">
                    <v-row v-if="!loading">
                        <v-expansion-panels variant="" v-if="faqs.length">
                            <v-col cols="12" lg="6" v-for="f in faqs" :key="f.id">
                                <v-expansion-panel rounded="lg" :class="i % 2 == 0 ? 'right' : 'left'">
                                    <v-expansion-panel-title class="title">
                                        {{ f.question }}
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        {{ f.answer }}
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-col>
                        </v-expansion-panels>
                        <v-col cols="12" v-else class="text-center not-found">
                            <img class="mx-auto text-center" width="500" src="../../assets/images/background/faq.svg" />
                            <p class="font-weight-bold text-center" style="font-size: 1.2rem; text-align: center">{{ $t('faq.noFAQs') }}</p>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-progress-linear color="skin" indeterminate></v-progress-linear>

                        <v-expansion-panels variant="">
                            <v-col cols="12" lg="6" v-for="i in 12" :key="i">
                                <div class="skelton rectangle"></div>
                            </v-col>
                        </v-expansion-panels>
                    </v-row>
                </div>
                <img src="@/assets/images/abstract/liquid.png" class="liquid-shape" alt="" />
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
import { toast } from 'vue3-toastify';
import axios from 'axios';
gsap.registerPlugin(ScrollTrigger);
const items = [
    {
        title: t('bread.faq'),
        disabled: true,
        href: '/FAQs'
    }
];
const loading = ref(true);
const faqs = ref([]);

onMounted(async () => {
    window.scrollTo(0, 0);

    try {
        axios.defaults.headers.common['Authorization'] = null;
        const res = await axios.get('api/faqs');
        if (res.status == 200) {
            faqs.value = res.data.faqs;
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
.faq {
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
    .faqs {
        position: relative;
        height: auto;

        .liquid-shape {
            position: absolute;
            top: 8%;
            width: 100%;
            z-index: 0;
            opacity: 0.15;
        }
        .v-expansion-panel--active .title {
            background-color: #4b9f61 !important; // Change to your desired color
            color: white;
        }
    }
}
.skelton {
    background: linear-gradient(to bottom right, rgba(187, 179, 179, 0.321), rgba(255, 254, 254, 0.096));
    border-radius: 10px;
    width: 100%;
    animation: shimmer 2s infinite;
    background-size: 200% 100%;

    &.rectangle {
        margin-top: 10px;
        height: 50px;
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
