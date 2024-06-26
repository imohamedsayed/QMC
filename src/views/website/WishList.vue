<template>
    <div class="wish-list py-10">
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

            <List v-if="wishlist.length" />
            <div class="text-center not-found" v-else>
                <img class="mx-auto text-center" width="500" src="../../assets/images/wishlist.svg" />
                <p class="font-weight-bold text-center" style="font-size: 1.2rem; text-align: center">{{ $t('wish_list.empty') }}</p>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import List from '@/components/website/wishlist/List.vue';
import { useI18n } from 'vue-i18n';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { computed, onMounted } from 'vue';
import { useWishlistStore } from '@/stores/WishlistStore';
gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n({ useScope: 'global' });
const items = [
    {
        title: t('bread.wishlist'),
        disabled: true,
        href: 'wishlist'
    }
];

const wishlist = computed(() => useWishlistStore().Wishlist);
onMounted(() => {
    //animations
    gsap.from('.wish-item', {
        x: 500,
        duration: 1,
        stagger: 0.5
    });
});
</script>

<style lang="scss">
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
</style>
