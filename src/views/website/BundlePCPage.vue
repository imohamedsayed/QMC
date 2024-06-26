<template>
    <div class="pc-brands py-10">
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
            <div v-if="loading" class="py-16 my-16 text-center">
                <v-progress-circular :width="5" size="200" color="primary" indeterminate></v-progress-circular>
            </div>
            <div v-else-if="!loading && pcs.length" class="mt-16">
                <section class="animate__animated animate__backInLeft" v-for="pc in pcs" :key="pc.id">
                    <p class="brands-section-title animate__animated animate__backInDown">{{ pc.name }}</p>
                    <Models :models="pc.pcModel" />
                </section>
            </div>
            <div v-else class="text-center not-found">
                <img class="mx-auto" width="500" src="../../assets/images/products/noPc.svg" />
                <p class="font-weight-bold" style="font-size: 1.2rem; text-align: center">{{ $t('bundle.noProducts') }}</p>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import axios from 'axios';

import Models from '@/components/website/bundle/models/Models.vue';
const { t } = useI18n({ useScope: 'global' });
const props = defineProps({
    type: {
        type: Number,
        required: true
    }
});
const items = [
    {
        title: props.type == 1 ? t('bread.buildYOB') : t('bundle.laptop'),
        disabled: true,
        href: '/build-ur-bundle'
    },
    {
        title: t('bread.models'),
        disabled: true,
        href: 'BundlePCBrands'
    }
];

const pcs = ref([]);
const loading = ref(false);
onMounted(async () => {
    window.scrollTo(0, 0);

    loading.value = true;
    try {
        const res = await axios.get('api/pcs/' + props.type);

        if (res.status == 200) {
            pcs.value = res.data.data;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {}
    loading.value = false;
});
</script>

<style lang="scss" scoped>
.pc-brands {
    section {
        p.brands-section-title {
            text-align: center;
            padding: 20px;
            background: var(--skin-color);
            color: white;
            font-weight: bold;
            margin-bottom: 30px;
            border-top-left-radius: 100px;
            border-bottom-right-radius: 100px;
        }
    }
}
.not-found {
    img {
        @media (max-width: 500px) {
            width: auto !important;
        }
        text-align: center !important;
    }
}
</style>
