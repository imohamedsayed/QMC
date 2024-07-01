<template>
    <div class="blogs py-10">
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

            <div class="blogs-content my-10">
                <div class="title text-center animate__animated animate__backInDown">
                    <p class="text-skin">{{ $t('blogs.title') }}</p>
                </div>

                <div class="blogs-list mt-15">
                    <v-row>
                        <v-col cols="12" md="6" lg="4" v-for="i in 9" :key="i" @click="$router.push({ name: 'blog', params: { id: i } })">
                            <v-card class="blog pb-2">
                                <v-img src="./images/blog2.png" cover>
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                                <span class="text-green text-body-2 mx-4 d-block">30 Mars 2023</span>

                                <v-card-title class="text-green font-weight-bold">FEASIBILITY STUDY IN SAUDI ARABIA</v-card-title>
                                <v-card-text
                                    >Financial control is of paramount importance in the administrative process. One of the most important
                                    pillars of this process and the...</v-card-text
                                >
                                <v-btn elevation="0" class="mx-4" color="skin">{{ $t('blogs.more') }}</v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-pagination v-model="page" :length="15" class="mt-8 text-skin" dir="ltr"></v-pagination>
                </div>
                <img src="@/assets/images/abstract/shape1.png" class="liquid-shape" alt="" />
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
        title: t('bread.blog'),
        disabled: true,
        href: 'blogs'
    }
];
const page = ref(1);

onMounted(() => {
    // animations
    window.scrollTo(0, 0);
    gsap.utils.toArray('.blog').forEach((box) => {
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
.blogs {
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    .liquid-shape {
        position: absolute;
        top: 8%;
        width: 100%;
        z-index: 0;
        opacity: 0.15;
    }
    .title {
        position: relative;
        z-index: 10;
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
    .blogs-list {
        position: relative;
        z-index: 10;
        .blog {
            background: #ffffffa7;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
                transform: scale(1.05);
            }
        }
    }
}
</style>
