<template>
    <div class="category py-10">
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
            <div v-if="loading">
                <div class="skelton text-center pt-10">
                    <v-progress-circular color="primary" width="3" size="120" indeterminate></v-progress-circular>
                </div>
                <v-progress-linear color="primary" indeterminate></v-progress-linear>
                <hr />
                <v-row class="mt-16">
                    <v-col cols="12" md="4" lg="3" v-for="i in 8" :key="i">
                        <div class="product-skelton"></div>
                    </v-col>
                </v-row>
            </div>
            <div v-else-if="!loading && category">
                <h2 class="text-center animate__animated animate__backInLeft">{{ category.name }}</h2>
                <v-sheet class="category-header mt-10 mb-16 text-center animate__animated animate__backInDown">
                    <img :src="apiUrl + category.cover" alt="" />
                </v-sheet>
                <div class="product-container">
                    <Products :products="products" :category="id" :pagination="pagination" v-if="products.length" />
                    <div v-else class="text-center">
                        <img class="mx-auto" width="500" src="../../assets/images/noCatProducts.svg" />
                        <p class="font-weight-bold" style="font-size: 1.2rem; text-align: center">{{ $t('category.noProducts') }}</p>
                    </div>
                </div>
            </div>
            <div v-else class="text-center not-found">
                <img class="mx-auto" width="500" src="../../assets/images/category.svg" />
                <p class="font-weight-bold" style="font-size: 1.2rem; text-align: center">{{ $t('category.notFound') }}</p>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import Products from '@/components/website/Category/Products.vue';
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import axios from 'axios';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
const loading = ref(false);
const error = ref('');
const products = ref([]);
const category = ref(null);
const apiUrl = import.meta.env.VITE_API_URL;
const pagination = ref();

onMounted(async () => {
    window.scrollTo(0, 0);

    loading.value = true;

    try {
        const res = await axios.get(`api/products/${props.id}/categories?latcreatedAt=desc`);
        if (res.status == 200) {
            pagination.value = res.data.meta.pagination;
            category.value = res.data.category;
            products.value = res.data.products;
        } else {
            throw new Error(res.response?.data?.message || 'Something went wrong, try again later');
        }
    } catch (err) {
        error.value = err.message;
    }

    loading.value = false;
});

const { t } = useI18n({ useScope: 'global' });
const items = [
    {
        title: t('bread.categories'),
        disabled: false,
        href: '/'
    },
    {
        title: t('bread.category'),
        disabled: true,
        href: 'category'
    }
];
</script>

<style lang="scss" scoped>
.category {
    .category-header {
        height: 200px;
        display: grid;
        place-content: center;
        box-shadow: 8px 10px 25px 2px rgba(0, 0, 0, 0.2);
        @media (max-width: 550px) {
            height: 140px;
        }
        border-radius: 10px;
        position: relative;
        img {
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 10px;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            z-index: 2;
            background: rgba(0, 0, 0, 0.5);
        }
        p {
            z-index: 3;
            color: white;
            font-weight: bold;
            text-transform: capitalize;
        }
        .view-btn {
            width: 100px;
            position: absolute;
            bottom: 0px;
            left: 0;
            z-index: 3;
        }
    }
    .not-found {
        text-align: center !important;
        img {
            @media (max-width: 500px) {
                width: auto !important;
            }
        }
    }
    .product-container {
        height: auto !important;
        overflow-x: hidden;
    }
}
.skelton {
    border-bottom-right-radius: 100px;
    border-top-left-radius: 100px;
    height: 200px;
    background: rgba(128, 128, 128, 0.104);
    margin-bottom: 140px;
}
.product-skelton {
    height: 300px;
    border-radius: 15px;
    background: rgba(128, 128, 128, 0.104);
}
</style>
