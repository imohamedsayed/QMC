<template>
    <div class="w-md-75 w-50 position-relative search">
        <v-text-field
            color="white"
            class="w-75 mt-5 search rounded-pill"
            :label="$t('header.search')"
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
            base-color="#fff"
            v-model="key"
            clearable
        >
        </v-text-field>
        <div class="results animate__animated animate__fadeInLeft" v-if="showResults">
            <v-list max-height="260" class="search-list" v-if="!loading">
                <v-list-item
                    v-for="p in results"
                    :key="p.id"
                    :prepend-avatar="apiUrl + p.ImagePath + p.mediaFirst?.name"
                    :to="'/product/' + p.slug"
                >
                    <v-list-item-title>{{ p.name }}</v-list-item-title>
                    <v-list-item-subtitle v-if="p.description"
                        >{{ p.description?.substring(0, 20) }}{{ p.description?.length > 20 ? '...' : '' }}</v-list-item-subtitle
                    >
                </v-list-item>
                <p v-if="!results.length" class="pa-4 text-muted">{{ $t('search.noResults') }}{{ key }}</p>
            </v-list>
            <div v-else class="text-center py-10">
                <v-progress-circular color="primary" width="3" size="50" indeterminate></v-progress-circular>
            </div>
            <div :class="['close', $i18n.locale == 'AR' ? 'ar' : 'en']">
                <v-btn icon elevation="1" @click="showResults = false"><v-icon color="black">mdi-close</v-icon></v-btn>
            </div>
            <v-btn block color="primary" :to="'/products?search=' + key">{{ $t('search.seeAllResults') }}</v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';
import type { Product } from '@/types/website/WishlistType';

const showResults = ref<boolean>(false);

const key = ref<string>('');
const loading = ref<boolean>(false);
const results = ref<Product[]>([]);
const apiUrl = import.meta.env.VITE_API_URL;

watch(
    key,
    (value) => {
        search();
    },
    { deep: true }
);

const search = async () => {
    if (!key.value) {
        showResults.value = false;
    } else {
        showResults.value = true;
        loading.value = true;

        try {
            const res: any = await axios.get(`api/products-search?like=${key.value}`);
            if (res.status == 200) {
                results.value = res.data.products;
                console.log(results.value);
            } else {
                throw new Error(res.response.data.message);
            }
        } catch (error) {}

        loading.value = false;
    }
};
</script>

<style lang="scss" scoped>
.search {
    @media (max-width: 400px) {
        width: 100% !important;
    }
    .results {
        position: absolute;
        width: 75%;
        background: white;
        @media (max-width: 720px) {
            width: 100%;
        }
        .close {
            position: absolute;
            top: 10px;
            right: 10px;
        }
        .search-list {
            &::-webkit-scrollbar {
                width: 8px;
            }
            &::-webkit-scrollbar-thumb {
                background: #5d88ff82;
                border-radius: 20px;
                transition: all 0.3s ease;
                &:hover {
                    background: #5d87ff;
                }
            }
        }
    }
}
</style>
