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

            <div class="blog-content my-10" v-if="!loading">
                <div v-if="blog">
                    <div class="title mb-10">
                        <p class="animate__animated animate__fadeInDown">{{ blog.name }}</p>
                        <span class="animate__animated animate__fadeInUp">{{ blog.created_at }}</span>
                    </div>
                    <div class="blog-img-text">
                        <v-img class="blog-img right" :src="apiUrl + blog.ImagePath + blog.media?.name" cover style="max-height: 600px">
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                </div>
                            </template>
                        </v-img>
                        <div class="blog-details mt-10 left mx-5 mx-md-10">
                            <div v-html="blog.description"></div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center not-found">
                    <img class="mx-auto text-center" width="500" src="../../assets/images/background/blog.svg" />
                    <p class="font-weight-bold text-center" style="font-size: 1.2rem; text-align: center">{{ $t('blogs.notFound') }}</p>
                </div>
                <img src="@/assets/images/abstract/shape1.png" class="liquid-shape" alt="" />
            </div>

            <div class="blog-content my-10" v-else>
                <div class="skelton header mb-10"></div>
                <v-progress-linear color="skin" indeterminate></v-progress-linear>

                <div class="blog-img-text">
                    <div class="skelton rectangle"></div>
                    <div class="blog-details mt-10 left">
                        <div class="skelton rectangle"></div>
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
import { toast } from 'vue3-toastify';
import axios from 'axios';

const { t } = useI18n({ useScope: 'global' });
gsap.registerPlugin(ScrollTrigger);
const apiUrl = import.meta.env.VITE_API_URL;

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

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const blog = ref(null);

const loading = ref(true);
onMounted(async () => {
    window.scrollTo(0, 0);
    try {
        axios.defaults.headers.common['Authorization'] = null;
        const res = await axios.get('api/blogs/' + props.id);
        if (res.status == 200) {
            blog.value = res.data.data;
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
.skelton {
    background: linear-gradient(to bottom right, rgba(187, 179, 179, 0.321), rgba(255, 254, 254, 0.096));
    border-radius: 10px;
    width: 100%;
    animation: shimmer 2s infinite;
    background-size: 200% 100%;
    &.header {
        height: 30px;
        width: 400px;
        margin: 0 auto;
        margin-bottom: 16px;
    }
    height: 20px;
    &.p {
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
