<template>
    <swiper
        class="products-swiper"
        :slidesPerView="1"
        :spaceBetween="30"
        :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }"
        :pagination="{
            clickable: true,
            dynamicBullets: true
        }"
        :modules="[Pagination, Navigation]"
        :loop="true"
        :grabCursor="true"
        :breakpoints="{
            '480': {
                slidesPerView: 1,
                spaceBetween: 50
            },
            '640': {
                slidesPerView: 2,
                spaceBetween: 50
            },
            '1024': {
                slidesPerView: 3,
                spaceBetween: 50
            },
            '1264': {
                slidesPerView: 4,
                spaceBetween: 55
            },
            '1600': {
                slidesPerView: 4,
                spaceBetween: 55
            },
            '1900': {
                slidesPerView: 5,
                spaceBetween: 50
            },
            '2400': {
                slidesPerView: 6,
                spaceBetween: 50
            }
        }"
    >
        <swiper-slide v-for="p in products" :key="p.id">
            <Product :product="p" />
        </swiper-slide>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import Product from '@/components/website/Product/Product.vue';
// import swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.swiper {
    height: 530px;
    @media (min-width: 1900px) {
        height: 650px;
    }
    padding: 0 50px;
    .swiper-slide {
        height: 400px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    [class^='swiper-button-']::after {
        font-size: 20px;
        font-weight: bold;
    }
    .swiper-button-next,
    .swiper-button-prev {
        background-color: var(--skin-color);
        padding: 5px 20px;

        border-radius: 100%;
        color: white;
        font-size: 10px !important;

        @media (max-width: 640px) {
            display: none;
        }
    }
    .swiper-button-next {
        right: 0;
    }
    .swiper-button-prev {
        right: 0 !important;
    }
}
</style>
