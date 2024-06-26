<template>
    <div class="cart py-10">
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
            <div v-if="cart.length">
                <Stepper :steps="steps" :currentStep="step" class="mb-16 mt-10" />
                <v-window v-model="step" :touch="{ left: null, right: null }">
                    <v-window-item :value="1">
                        <CartDetails />
                        <div class="payment-methods mt-10">
                            <h2>{{ $t('cart.payment_methods') }}</h2>
                            <v-slide-group
                                :touch="{ left: null, right: null }"
                                v-model="paymentMethod"
                                selected-class="bg-primary"
                                mandatory
                                show-arrows
                                dir="ltr"
                                center-active
                            >
                                <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }">
                                    <v-card
                                        style="position: relative; border-radius: 10px"
                                        color="grey-lighten-1"
                                        :class="['ma-4', selectedClass, 'pay-method']"
                                        height="200"
                                        width="300"
                                        @click="toggle"
                                    >
                                        <div class="fill-height visa">
                                            <div class="overlay">{{ $t('bundle.visa') }}</div>
                                        </div>

                                        <div class="d-flex fill-height align-center justify-center">
                                            <v-scale-transition
                                                style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: 100"
                                            >
                                                <v-icon
                                                    v-if="isSelected"
                                                    color="white"
                                                    size="48"
                                                    icon="mdi-close-circle-outline"
                                                    style="background: #5d88ffab"
                                                ></v-icon>
                                            </v-scale-transition>
                                        </div>
                                    </v-card>
                                </v-slide-group-item>
                                <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }">
                                    <v-card
                                        style="position: relative; border-radius: 10px"
                                        color="grey-lighten-1"
                                        :class="['ma-4', selectedClass, 'pay-method']"
                                        height="200"
                                        width="300"
                                        @click="toggle"
                                    >
                                        <div class="delivery fill-height">
                                            <div class="overlay">{{ $t('bundle.cash') }}</div>
                                        </div>

                                        <div class="d-flex fill-height align-center justify-center">
                                            <v-scale-transition
                                                style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: 100"
                                            >
                                                <v-icon
                                                    v-if="isSelected"
                                                    color="white"
                                                    size="48"
                                                    icon="mdi-close-circle-outline"
                                                    class=""
                                                    style="background: #5d88ffab"
                                                ></v-icon>
                                            </v-scale-transition>
                                        </div>
                                    </v-card>
                                </v-slide-group-item>
                                <v-slide-group-item v-slot="{ isSelected, toggle, selectedClass }">
                                    <v-card
                                        style="position: relative; border-radius: 10px"
                                        color="grey-lighten-1"
                                        :class="['ma-4', selectedClass, 'pay-method']"
                                        height="200"
                                        width="300"
                                        @click="toggle"
                                    >
                                        <div class="station fill-height">
                                            <div class="overlay">{{ $t('bundle.shipping') }}</div>
                                        </div>

                                        <div class="d-flex fill-height align-center justify-center">
                                            <v-scale-transition
                                                style="position: absolute; top: 0; left: 0; height: 100%; width: 100%; z-index: 100"
                                            >
                                                <v-icon
                                                    v-if="isSelected"
                                                    color="white"
                                                    size="48"
                                                    icon="mdi-close-circle-outline"
                                                    style="background: #5d88ffab"
                                                ></v-icon>
                                            </v-scale-transition>
                                        </div>
                                    </v-card>
                                </v-slide-group-item>
                            </v-slide-group>
                        </div>
                    </v-window-item>
                    <v-window-item :value="2">
                        <CardCheckoutVue v-if="paymentMethod == 0" />
                        <Delivery v-if="paymentMethod == 1" @confirm="confirmed = true" />
                        <ShippingStation v-if="paymentMethod == 2" @confirm="confirmed = true" />
                    </v-window-item>
                    <v-window-item :value="3"> <Approved /> </v-window-item>
                </v-window>
                <div class="mt-10 d-flex align-center justify-space-between gap-4">
                    <v-btn color="black" size="large" width="120" v-if="step == 2" @click="step--">
                        <v-icon>mdi-chevron-left</v-icon> {{ $t('cart.prev') }}
                    </v-btn>
                    <v-btn color="primary" size="large" width="120" v-if="step < 2" @click="nextStep">
                        <v-icon>mdi-chevron-right</v-icon>
                        {{ $t('cart.next') }}</v-btn
                    >
                </div>
            </div>
            <div v-else-if="!cart.length && !confirmed" class="text-center not-found">
                <img class="mx-auto text-center" width="500" src="../../assets/images/cart.svg" />
                <p class="font-weight-bold text-center" style="font-size: 1.2rem; text-align: center">{{ $t('cart.empty') }}</p>
            </div>
            <div v-else>
                <div class="approved text-center">
                    <h2 class="font-weight-bold">{{ $t('cart.approved') }}</h2>
                    <v-img src="./images/Approval.svg" width="100" class="mx-auto my-10"></v-img>
                    <p style="font-size: 1.3rem; text-align: center">
                        {{ $t('cart.thanks') }}
                    </p>
                    <v-btn color="success" class="mt-7 text-center" size="large" to="/">{{ $t('cart.done') }}</v-btn>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import Stepper from '@/components/shared/Stepper.vue';
import CartDetails from '@/components/website/cart/CartDetails.vue';
import Approved from '@/components/website/cart/checkout/Approved.vue';
import CardCheckoutVue from '@/components/website/cart/checkout/CardCheckout.vue';
import Delivery from '@/components/website/cart/checkout/Delivery.vue';
import ShippingStation from '@/components/website/cart/checkout/ShippingStation.vue';
import { ref, onMounted, computed, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { useI18n } from 'vue-i18n';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { useCartStore } from '@/stores/CartStore';

const cart = computed(() => useCartStore().Cart);

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n({ useScope: 'global' });
const items = [
    {
        title: t('bread.cart'),
        disabled: true,
        href: 'Cart'
    }
];
const steps = ref([{ name: t('cart.step1') }, { name: t('cart.step2') }, { name: t('cart.step3') }]);
const step = ref(1);
const confirmed = ref(false);
const paymentMethod = ref(null);

watch(
    step,
    (value) => {
        window.scrollTo(0, 0);
    },
    { deep: true }
);
watch(
    confirmed,
    (value) => {
        window.scrollTo(0, 0);
    },
    { deep: true }
);
onMounted(() => {
    window.scrollTo(0, 0);
    //  animation

    gsap.utils.toArray('.pay-method').forEach((box) => {
        gsap.from(box, {
            x: -400,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });
    });
});

const nextStep = () => {
    if (paymentMethod.value == null) {
        toast.error('please choose a payment method');
    } else {
        step.value = 2;
    }
};
</script>

<style lang="scss">
.visa,
.delivery,
.station {
    position: relative;
    box-shadow: 1px 5px 12px 3px rgba(0, 0, 0, 0.2);
    .overlay {
        position: absolute;

        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        color: #fff;
        font-weight: bold;
        font-size: 1.5rem;
        place-content: center;
        background: rgba(0, 0, 0, 0.4);
    }
}
.visa {
    background: url('@/assets/images/background/pm4.jpg') top center no-repeat;
    background-size: cover;
}
.delivery {
    background: url('@/assets/images/background/pm7.jpg') top center no-repeat;
    background-size: cover;
}
.station {
    background: url('@/assets/images/background/pm6.jpg') top center no-repeat;
    background-size: cover;
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
.approved {
    text-align: center !important;
    p,
    h1,
    h2,
    h3 {
        text-align: center !important;
    }
}
</style>
