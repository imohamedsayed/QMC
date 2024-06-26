<template>
    <div class="product py-10">
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
                <v-row class="mt-10">
                    <v-col cols="12" md="6">
                        <div class="img skelton text-center pt-16" style="height: 520px"></div>
                    </v-col>
                    <v-col cols="12" md="6" class="second-col">
                        <div class="img skelton mb-5 text-center pt-10" style="height: 250px">
                            <v-progress-circular color="primary" width="3" size="120" indeterminate></v-progress-circular>
                        </div>
                        <div class="img last-img skelton text-center pt-10" style="height: 250px">
                            <v-progress-circular color="primary" width="3" size="120" indeterminate></v-progress-circular>
                        </div>
                    </v-col>
                </v-row>

                <v-progress-linear color="primary" indeterminate></v-progress-linear>

                <v-row class="mt-10">
                    <v-col cols="12" md="4">
                        <div class="skelton" style="height: 400px"></div>
                    </v-col>
                    <v-col cols="12" md="8">
                        <div class="skelton" style="height: 400px"></div>
                    </v-col>
                </v-row>
            </div>
            <div v-else-if="!loading && product">
                <ProductImages :media="media" :imagePath="imagePath" />
                <div class="product-details">
                    <v-row>
                        <v-col cols="12" md="5">
                            <div class="list text-center text-md-start left">
                                <v-list-item class="pa-0 px-0">
                                    <span class="font-weight-bold"> {{ t('product.product') }}</span>
                                    : {{ product.name }}
                                </v-list-item>
                                <v-divider color="primary my-1"></v-divider>
                                <v-list-item class="pa-0 px-0" v-if="!product.sale">
                                    <span class="font-weight-bold"> {{ t('product.price') }}</span>
                                    : {{ product.price }} {{ t('product.le') }}
                                </v-list-item>

                                <v-list-item class="pa-0 px-0" v-else>
                                    <span class="font-weight-bold"> {{ t('product.price') }}</span>
                                    : {{ product.price - product.sale.discount }} {{ t('product.le') }}
                                    <del class="text-muted ml-2"
                                        ><small> {{ product.price }}{{ t('product.le') }}</small></del
                                    >
                                    <div v-if="product.sale">
                                        <v-chip color="heart" size="90" class="px-2" closable v-if="product.sale.expire_date"
                                            >{{ t('product.offer_date') }} {{ product.sale.expire_date }}</v-chip
                                        >
                                        <v-chip color="primary" size="120" class="px-2" closable v-else>{{
                                            t('product.offer_no_date')
                                        }}</v-chip>
                                    </div>
                                </v-list-item>
                                <v-divider color="primary my-1"></v-divider>

                                <v-list-item class="pa-0 px-0">
                                    <span class="font-weight-bold"> {{ t('product.quantity') }}</span>
                                    : {{ product.quantity }}
                                </v-list-item>
                                <v-divider color="primary my-1"></v-divider>

                                <v-btn color="skin" class="d-block mx-auto mx-md-0 mt-10" width="200" @click="addToCart">
                                    <v-icon class="mx-2">mdi-cart</v-icon>
                                    {{ t('product.addCart') }}
                                </v-btn>
                                <v-btn color="success" width="200" class="mt-4" @click="addToWishlist">
                                    <v-icon class="mx-2">mdi-heart</v-icon>
                                    {{ t('product.addWishlist') }}
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col cols="12" md="7" v-if="product.description">
                            <div class="desc right">
                                <h2>{{ $t('product.description') }}</h2>
                                <div class="content pa-10">
                                    {{ product.description }}
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <div class="related-product mt-16 px-0 px-sm-16 px-lg-0">
                    <h2 class="mb-10">{{ t('product.related') }}</h2>
                    <Swiper :products="relatedProducts" />
                </div>
            </div>
            <div v-else class="text-center not-found">
                <img class="mx-auto" width="500" src="../../assets/images/category.svg" />
                <p class="font-weight-bold" style="font-size: 1.2rem; text-align: center">{{ $t('product.noProduct') }}</p>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import ProductImages from '@/components/website/Product/ProductImages.vue';
import Swiper from '@/components/shared/Swiper.vue';
import { useI18n } from 'vue-i18n';
import { onMounted, ref, watch } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { toast } from 'vue3-toastify';
import axios from 'axios';
import { useCartStore } from '@/stores/CartStore';
import { useWishlistStore } from '@/stores/WishlistStore';
gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n({ useScope: 'global' });
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const items = [
    {
        title: t('bread.product'),
        disabled: true,
        href: 'Product'
    }
];

const props = defineProps({
    slug: {
        type: String,
        required: true
    }
});

const loading = ref(true);
const product = ref();
const relatedProducts = ref([]);
const media = ref([]);
const imagePath = ref('');
const fav = ref(false);
const inCart = ref(false);
onMounted(async () => {
    window.scrollTo(0, 0);

    await fetchData();

    // animations
    fav.value = wishlistStore.isExisted(product.value?.id);
    inCart.value = cartStore.isExisted(product.value?.id);

    gsap.from('.right', {
        x: 400,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.right',
            start: 'top 80%'
        }
    });
    gsap.from('.left', {
        x: -400,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.left',
            start: 'top 80%'
        }
    });
});

watch(
    props,
    (value) => {
        window.scrollTo(0, 0);

        fetchData();
    },
    { deep: true }
);

const fetchData = async () => {
    loading.value = true;

    try {
        const res = await axios.get('api/products/' + props.slug);
        if (res.status == 200) {
            product.value = res.data.product;
            imagePath.value = product.value?.ImagePath;
            media.value = product.value?.media;
        } else {
            throw new Error(res.response?.data?.message || 'Something went wrong, try again later');
        }
        // fetching related products
        const related_res = await axios.get(`api/products/${product.value?.id}/related`);
        if (related_res.status == 200) {
            relatedProducts.value = related_res.data.product;
        } else {
            throw new Error(related_res.response?.data?.message || 'something went wrong, please try again later');
        }
    } catch (error) {
        toast.error(error.message);
    }
    loading.value = false;
};

const addToCart = () => {
    if (inCart.value) {
        cartStore.RemoveItemFromCart(product.value?.id);
        toast.success(t('cart.removed'));
        inCart.value = false;
    } else {
        cartStore.AddToCart(product.value?.id);
        wishlistStore.removeItemFromWishlist(product.value?.id);
        toast.success(t('cart.added'));
        fav.value = false;
        inCart.value = true;
    }
};
const addToWishlist = () => {
    if (fav.value) {
        wishlistStore.removeItemFromWishlist(product.value?.id);
        toast.success(t('wish_list.removed'));
        fav.value = false;
    } else {
        wishlistStore.addToWishList(product.value?.id);
        cartStore.RemoveItemFromCart(product.value?.id);
        toast.success(t('wish_list.added'));
        fav.value = true;
    }
};
</script>

<style lang="scss" scoped>
.product {
    .list {
        font-size: 1.4rem;
    }
    .desc {
        .content {
            margin-top: 18px;
            font-size: 1.4rem;
            border-radius: 26px;
            border: 1px solid var(--skin-color);
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
}
.skelton {
    height: 200px;
    background: rgba(128, 128, 128, 0.104);
    margin-bottom: 140px;
    border-radius: 30px;
}
.product-skelton {
    height: 300px;
    border-radius: 15px;
    background: rgba(128, 128, 128, 0.104);
}
</style>
