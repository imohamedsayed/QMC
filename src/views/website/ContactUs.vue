<template>
    <div class="contact mb-15 py-10">
        <v-container>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-btn icon elevation="0" class="bg-background" to="/">
                        <v-icon class="mx-1" size="small" icon="mdi-home" color="blueLogo"></v-icon>
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

            <h3 class="my-10 animate__animated animate__backInDown">{{ $t('contact_us.intro') }}</h3>
        </v-container>

        <v-row class="mt-5 pa-0">
            <v-col cols="12" md="6">
                <v-container>
                    <div :class="['form-wrapper', $i18n.locale === 'AR' ? 'right' : 'left']">
                        <form class="cb-form" @submit.prevent="sendMessage">
                            <div>
                                <p>{{ $t('contact_us.request') }}</p>
                                <v-text-field :label="$t('contact_us.name')" color="skin" v-model="name" readonly=""></v-text-field>
                                <v-text-field :label="$t('contact_us.email')" color="skin" v-model="email" readonly></v-text-field>
                                <v-text-field :label="$t('contact_us.phone')" color="skin" v-model="phone" readonly></v-text-field>
                                <v-textarea :label="$t('contact_us.message')" v-model="message" color="skin" required></v-textarea>
                                <v-btn :loading="loading" color="blueLogo" block size="large" type="submit">{{
                                    $t('contact_us.submit')
                                }}</v-btn>
                            </div>
                        </form>
                    </div>
                </v-container>
            </v-col>
            <v-col cols="12" md="6" :class="['touch', $i18n.locale === 'AR' ? 'ar' : '']">
                <img src="@/assets/images/landing/contact_circle.svg" alt="" /> 
                <div :class="['content', 'pl-16', $i18n.locale === 'AR' ? 'left' : 'right']">
                    <h2>{{ $t('contact_us.get_touch') }}</h2>
                    <span class="separator"></span>

                    <v-list>
                        <v-list-item prepend-icon="mdi-map-marker">{{ $t('contact_us.address') }}</v-list-item>
                        <v-list-item prepend-icon="mdi-phone">+9991232xxxx, +9991232xxxx</v-list-item>
                        <v-list-item prepend-icon="mdi-email">QMC.inc@gmail.com</v-list-item>
                    </v-list>
                    <div class="social-links text-skin">
                        <a href="https://wa.me/+201111922571?text=Hello%future!" target="_blank" class="text-green">
                            <v-btn elevation="0" icon><v-icon>mdi-whatsapp</v-icon></v-btn>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100090516042333" target="_blank" class="text-green">
                            <v-btn elevation="0" icon><v-icon>mdi-facebook</v-icon></v-btn>
                        </a>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { computed, onMounted, ref } from 'vue';

import { toast } from 'vue3-toastify';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const name = ref('');
const phone = ref('');
const email = ref('');
const message = ref('');
const items = [
    {
        title: t('bread.contact'),
        disabled: true,
        href: 'Product'
    }
];
const loading = ref(false);
onMounted(() => {
    window.scrollTo(0, 0);

    // animations

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

const sendMessage = async () => {
    loading.value = true;
    try {
        const res = await axios.post('api/messages', {
            message: message.value
        });

        if (res.status == 201) {
            toast.success(t('contact_us.messageSent'));
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
    loading.value = false;
};
</script>

<style lang="scss" scoped>
.contact {
    .form-wrapper {
        background-color: white;
        padding: 30px;
        box-sizing: border-box;
        border-radius: 50px;
        border: inset;
        max-width: 500px;
        margin: 0 auto;

        .cb-form {
            padding: 30px;
            border: outset;
            border-radius: 50px;
            margin: 0 auto;
        }
    }
    .touch {
        position: relative;
        &.ar {
            img {
                right: auto;
                left: 0;
                transform: rotate(180deg);
            }
            .content {
                border-top-right-radius: 30%;
                border-bottom-right-radius: 20%;
                border-top-left-radius: 100%;
                border-bottom-left-radius: 70%;
            }
        }
        img {
            position: absolute;
            right: 0;
            top: -120px;
            width: 500px;
            @media (max-width: 862px) {
                top: -60px;
                width: 400px;
            }
        }
        .content {
            position: relative;
            background-color: white;
            z-index: 100;
            max-width: 90%;
            height: 601px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding: 40px;
            border-top-left-radius: 30%;
            border-bottom-left-radius: 20%;
            border-top-right-radius: 100%;
            border-bottom-right-radius: 70%;
            .separator {
                display: block;
                margin: 20px 0;
                height: 20px;
                background: linear-gradient(180deg, #4b9f61 0%, rgba(42, 137, 108, 0.342) 100%);
                width: 200px;
                border-radius: 20px;
            }
        }
    }
}
</style>
