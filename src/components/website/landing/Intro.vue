<template>
    <div class="intro d-flex align-center justify-space-between position-relative">
        <v-container class="px-md-16 d-flex align-center justify-space-between flex-column flex-md-row justify-center">
            <div class="text animate__animated animate__backInLeft pt-3">
                <h1 class="text-white" v-if="!loading">
                    <span class="text-black">{{ $t('intro.qmc') }}</span> <br />
                </h1>
                <div class="skeleton title" v-else></div>
                <p class="mt-4 text-muted" v-if="!loading">
                    {{ $t('intro.text') }} <span class="text-green">{{ $t('intro.anything') }}</span>
                </p>
                <div class="skeleton p mt-4" v-else></div>
                <v-btn
                    class="mt-10 text-white font-weight-bold animate__animated animate__backInUp cursor-pointer py-2"
                    size="x-large"
                    style="width: 246px; background: linear-gradient(to right, #4b9f61, #8eb6d3, #367cb5); font-size: 28px !important"
                    elevation="0"
                    rounded="lg"
                    to="/our-services"
                    >{{ $t('intro.start') }}</v-btn
                >
            </div>
            <div class="img animate__animated animate__backInRight" v-if="!loading">
                <img src="@/assets/images/landing/intro3.png" class="intro-img" alt="" />
                <!-- <v-img class="intro-img" src="./lawyer.svg" cover > </v-img> -->
            </div>
            <div class="skeleton image" v-else></div>
        </v-container>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});
</script>

<style lang="scss" scoped>
.intro {
    margin: 0 !important;
    height: calc(100vh - 100px);
    @media (max-width: 500px) {
        height: calc(100vh - 80px);
    }
    position: relative;
    > img {
        position: absolute;
        width: 1200px;
        height: 101%;
        right: 4.6%;
        opacity: 0.3;
    }

    .text,
    .img {
        flex: 0 0 1;
        max-width: 50%;

        @media (max-width: 959px) {
            max-width: 100%;
        }
    }
    .text {
        backdrop-filter: blur(2px);
        font-family: 'Rufina';

        h1 {
            font-size: 52px;
        }
        p {
            font-size: 24px;
        }
        @media (max-width: 959px) {
            text-align: center;

            h1 {
                font-size: 30px;
            }
            p {
                font-size: 18px;
            }
        }
        .intro-btn {
            background: linear-gradient(rgba(33, 22, 94, 1) rgba(37, 51, 180, 1) rgba(16, 9, 95, 1)) !important;
        }
    }
    .img {
        backdrop-filter: blur(2px);

        text-align: center;
        img {
            width: fit-content;
            z-index: 2;
            height: 400px;
            @media (max-width: 1404px) {
                height: 300px;
            }
            @media (max-width: 960px) {
                height: 150px;
            }
            @media (max-width: 959px) {
                margin-top: 40px;
                width: 300px;
            }
            @media (max-width: 500px) {
                width: 200px;
            }
            @media (max-width: 320px) {
                display: none;
            }
        }
    }
}
.skeleton {
    background: linear-gradient(to bottom right, rgba(187, 179, 179, 0.321), rgba(255, 254, 254, 0.096));
    border-radius: 10px;
    width: 100%;
    animation: shimmer 2s infinite;
    background-size: 200% 100%;
    &.title {
        height: 40px;
        margin-bottom: 16px;
    }
    &.p {
        height: 20px;
        margin-bottom: 8px;
    }
    &.image {
        width: 50%;
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
</style>
