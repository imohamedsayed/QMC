<template>
    <div class="search py-16">
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

            <div class="search-container py-10">
                <div class="d-flex align-center gap-3">
                    <v-text-field
                        :label="$t('search.searchForProduct')"
                        clearable
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        color="primary"
                        rounded="lg"
                        hint="eg. Dell G5"
                        v-model="search"
                    ></v-text-field>
                    <v-btn color="primary" size="large" class="mb-6" icon @click="loadSearchResults"
                        ><v-icon>mdi-magnify</v-icon>

                        <v-tooltip activator="parent">{{ $t('search.search') }}</v-tooltip>
                    </v-btn>
                </div>
            </div>
            <v-divider class="my-8"></v-divider>
            <div v-if="loading">
                <v-progress-linear color="primary" indeterminate></v-progress-linear>

                <v-row class="mt-16">
                    <v-col cols="12" md="4" lg="3" v-for="i in 8" :key="i">
                        <div class="product-skelton"></div>
                    </v-col>
                </v-row>
            </div>
            <div v-else-if="!loading && results.length" class="product-container">
                <Products :products="results" :search="search" :pagination="pagination" />
            </div>
            <div v-else class="text-center not-found">
                <img class="mx-auto" width="500" src="../../assets/images/background/noSearch.svg" />
                <p class="font-weight-bold" style="font-size: 1.2rem; text-align: center">{{ $t('search.noResults') }} {{ search }}</p>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from 'axios';
import Products from '@/components/website/search/Products.vue';
const items = [
    {
        title: t('bread.search'),
        disabled: true,
        href: 'Search'
    }
];
const results = ref([]);
let q = useRoute().query.search || '';
const search = ref(q.toString());
const loading = ref(true);
const pagination = ref();

watch(
    search,
    (value) => {
        loadSearchResults();
    },
    { deep: true }
);

const loadSearchResults = async () => {
    loading.value = true;
    try {
        const res = await axios.get(`api/products-search?like=${search.value}`);
        if (res.status == 200) {
            pagination.value = res.data.meta.pagination;
            results.value = res.data.products;
        } else {
            // throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
    loading.value = false;
};

onMounted(async () => {
    await loadSearchResults();
});
</script>

<style lang="scss" scoped>
.product-skelton {
    height: 300px;
    border-radius: 15px;
    background: rgba(128, 128, 128, 0.104);
}
.not-found {
    text-align: center !important;
    p {
        text-align: center !important;
    }
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
</style>
