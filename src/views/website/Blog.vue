<template>
    <div class="blog py-10">
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

            <div class="blog-content my-10">
                <div class="title mb-10">
                    <p class="animate__animated animate__fadeInDown">IMPORTANCE OF FINANCIAL CONTROL IN BUSINESS</p>
                    <span class="animate__animated animate__fadeInUp">30 Mars 2024</span>
                </div>
                <div class="blog-img-text">
                    <v-img
                        class="blog-img right"
                        src="https://mw7design.com.br/media/upload/ckeditor/2023/03/16/blog_Ghlcdge.jpg"
                        style="max-height: 400px"
                    >
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                    <div class="blog-details mt-10 left">
                        <p>
                            Financial control is of paramount importance in the administrative process. One of the most important pillars of
                            this process and the control process needs to regulated. In such a way on develop administrative activities. As
                            effective tools for development and management with different entities. As a result, It known that the
                            government behind its establishment. Aims to provide services to citizens. The role of regulators is to ensure
                            that these services provided as soon as possible. With the least effort and expenditure and in the form required
                            by law. The existence of efficient and effective financial control systems in any organization is one of the
                            most important factors in the organization’s success. Finally To achieving its objectives.
                        </p>
                    </div>
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
        title: t('bread.blogs'),
        disabled: false,
        href: '/blogs'
    },
    {
        title: t('bread.blog'),
        disabled: true,
        href: 'blog'
    }
];
const page = ref(1);

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
.blog {
    overflow-x: hidden;
    overflow-y: hidden;
    .blog-content {
        position: relative;
        .liquid-shape {
            position: absolute;
            top: 8%;
            width: 100%;
            z-index: 0;
            opacity: 0.15;
        }
    }

    .blog-img-text {
        background: #ffffff89;
        padding: 20px 0;
    }
    .title,
    .blog-img,
    .blog-details {
        position: relative;
        z-index: 10;
    }

    .title {
        position: relative;
        z-index: 10;
        text-align: center;
        padding-bottom: 15px;

        p {
            font-weight: bold;
            font-size: 2rem;
            position: relative;
        }
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
    .blog-details {
        padding: 20px;
    }
}
</style>
