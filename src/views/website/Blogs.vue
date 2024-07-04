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

            <div class="blogs-content my-10" v-if="!loading">
                <div class="title text-center animate__animated animate__backInDown">
                    <p class="text-skin">{{ $t('blogs.title') }}</p>
                </div>

                <div class="blogs-list mt-15">
                    <v-row v-if="blogs.length">
                        <v-col cols="12" md="6" lg="4" v-for="blog in blogs" :key="blog.id">
                            <v-card class="blog pb-2">
                                <v-img :src="apiUrl + blog.ImagePath + blog.media?.name" cover>
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                                <span class="text-skin text-body-2 mx-4 d-block">{{ blog.created_at }}</span>

                                <v-card-title class="text-green font-weight-bold">{{ blog.name }}</v-card-title>
                                <v-card-text>{{ blog.description.substring(0, 130) + '...' }}</v-card-text>
                                <v-btn
                                    elevation="0"
                                    class="mx-4"
                                    color="skin"
                                    @click="$router.push({ name: 'blog', params: { id: blog.id } })"
                                    >{{ $t('blogs.more') }}</v-btn
                                >
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-pagination v-model="page" :length="length" class="mt-8 text-skin" dir="ltr"></v-pagination>
                        </v-col>
                    </v-row>
                    <div v-else class="text-center not-found">
                        <img class="mx-auto text-center" width="500" src="../../assets/images/background/blog.svg" />
                        <p class="font-weight-bold text-center" style="font-size: 1.2rem; text-align: center">{{ $t('blogs.noBlogs') }}</p>
                    </div>
                </div>
                <img src="@/assets/images/abstract/shape1.png" class="liquid-shape" alt="" />
            </div>
            <div class="blogs-content my-10" v-else>
                <div class="title text-center animate__animated animate__backInDown mb-10">
                    <p class="text-skin">{{ $t('blogs.title') }}</p>
                </div>
                <v-progress-linear color="skin" indeterminate></v-progress-linear>

                <div class="blogs-list mt-15">
                    <v-row>
                        <v-col cols="12" md="6" lg="4" v-for="i in 9" :key="i" @click="$router.push({ name: 'blog', params: { id: i } })">
                            <div class="skelton card"></div>
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
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
import { IconUsersGroup } from '@tabler/icons-vue';
import { toast } from 'vue3-toastify';
import axios from 'axios';
gsap.registerPlugin(ScrollTrigger);
const items = [
    {
        title: t('bread.blog'),
        disabled: true,
        href: 'blogs'
    }
];
const apiUrl = import.meta.env.VITE_API_URL;

const page = ref(1);
const length = ref(1);
const loading = ref(true);
const blogs = ref([]);
onMounted(async () => {
    window.scrollTo(0, 0);

    // animations
    await loadBlogs();
});
watch(
    page,
    (value) => {
        loadBlogs();
    },
    { deep: true }
);

const loadBlogs = async () => {
    try {
        axios.defaults.headers.common['Authorization'] = null;
        const res = await axios.get('api/blogs?page=' + page.value);

        if (res.status == 200) {
            blogs.value = res.data.blogs;
            const pagination = res.data.meta.pagination;
            console.log(pagination);
            length.value = pagination.last_page;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    } finally {
        loading.value = false;
        animations();
    }
};

const animations = () => {
    setTimeout(() => {
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
    }, 100);
};
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

    &.card {
        margin-top: 10px;
        height: 300px;
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
