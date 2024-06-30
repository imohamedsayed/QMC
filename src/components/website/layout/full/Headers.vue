<template>
    <div class="top bg-blueLogo px-2 d-flex align-center justify-space-between">
        <div class="d-flex align-center gap-2">
            <p><v-icon>mdi-email-outline</v-icon> QMC.inc@gmail.com</p>
            <v-btn icon="mdi-whatsapp" elevation="0" class="bg-blueLogo" size="small"></v-btn> |
            <v-btn icon="mdi-facebook" elevation="0" class="bg-blueLogo" size="small"></v-btn> |
            <v-btn icon="mdi-instagram" elevation="0" class="bg-blueLogo" size="small"></v-btn>
        </div>
        <Language />
    </div>
    <header elevation="0" height="70" class="header" :dir="$i18n.locale == 'AR' ? 'rtl' : 'ltr'">
        <div class="d-flex align-center justify-space-between w-100 px-2">
            <div class="d-flex align-center">
                <v-btn
                    class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted d-block d-md-none"
                    @click="drawer = !drawer"
                    icon
                    variant="flat"
                    size="small"
                >
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <!-- LOGO -->
                <!-- <v-img src="@/assets/images/logo.png"></v-img> -->
                <img
                    src="@/assets/images/logo.jpeg"
                    class="mt-5 ml-4 pb-2 cursor-pointer logo-img"
                    alt=""
                    width="110"
                    height="80"
                    @click="$router.push({ name: 'landing' })"
                />
                <!-- Notification -->
            </div>
            <div class="navigation d-md-block d-none">
                <v-list class="d-flex text-blue font-weight-bold header-nav">
                    <v-list-item value="landing" to="/"> {{ $t('header.home') }} </v-list-item>
                    <v-list-item value="about" to="/about-us"> {{ $t('header.about') }}</v-list-item>
                    <v-list-item>
                        <v-menu open-on-hover>
                            <template v-slot:activator="{ props }">
                                <p v-bind="props" color="primary">{{ $t('header.services') }} <v-icon>mdi-chevron-down</v-icon></p>
                            </template>

                            <v-list>
                                <v-list-item color="primary" v-for="s in 4" :key="s" :value="'service ' + i">
                                    <v-list-item-title>{{ 'service ' + s }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-list-item>
                    <v-list-item value="process" to="/our-process"> {{ $t('header.process') }} </v-list-item>
                    <v-list-item value="clients" to="/our-clients"> {{ $t('header.clients') }}</v-list-item>
                    <v-list-item value="contact" to="/contact-us"> {{ $t('header.contact') }}</v-list-item>
                    <v-list-item value="blog" to="/blogs"> {{ $t('header.blog') }}</v-list-item>
                    <v-list-item value="faq" to="/FAQs"> {{ $t('header.faq') }}</v-list-item>
                </v-list>
            </div>
        </div>
    </header>
    <v-navigation-drawer
        left
        elevation="0"
        class="leftSidebar d-flex d-md-none"
        v-model="drawer"
        :location="$i18n.locale === 'AR' ? 'right' : 'left'"
        :dir="$i18n.locale === 'AR' ? 'rtl' : 'ltr'"
    >
        <!---Logo part -->
        <div class="d-flex justify-center py-4 text-center cursor-pointer pa-5" @click="$router.push('/')">
            <img src="@/assets/images/logo.jpeg" width="100" height="80" />
        </div>

        <div>
            <perfect-scrollbar class="scrollnavbar">
                <v-list class="pa-6">
                    <!---Menu Loop -->
                    <template v-for="item in sidebarMenu">
                        <!---Item Sub Header -->
                        <NavGroup :item="item" v-if="item.header" :key="item.title" />

                        <!---Single Item-->
                        <NavItem :item="item" v-else class="leftPadding" :key="item" />
                        <!---End Single Item-->
                    </template>
                    <!-- <v-expansion-panels>
                        <v-expansion-panel elevation="0">
                            <v-expansion-panel-title :class="$i18n.locale == 'EN' ? 'px-1' : 'px-2'">
                                <v-icon class="mx-2">mdi-devices</v-icon>{{ $t('header.categories') }}
                            </v-expansion-panel-title>
                        </v-expansion-panel>
                    </v-expansion-panels> -->
                    <v-list-item to="/login" rounded class="mb-1" active-color="primary" v-if="!user">
                        <!---If icon-->
                        <template v-slot:prepend>
                            <IconLogin />
                        </template>
                        <v-list-item-title>{{ $t(`side.login`) }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/register" rounded class="mb-1" active-color="primary" v-if="!user">
                        <!---If icon-->
                        <template v-slot:prepend>
                            <IconUserPlus />
                        </template>
                        <v-list-item-title>{{ $t(`side.signup`) }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item rounded class="mb-1" active-color="primary" v-if="user" @click="logout">
                        <!---If icon-->
                        <template v-slot:prepend>
                            <IconLogout />
                        </template>
                        <v-list-item-title>{{ $t(`side.logout`) }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <!-- <div class="pa-4">
                    <ExtraBox />
                </div> -->
            </perfect-scrollbar>
        </div>
    </v-navigation-drawer>
</template>

<script setup>
import Notification from './vertical-header/Notification.vue';
import Profile from './vertical-header/Profile.vue';
import Language from './vertical-header/Language.vue';
import { IconGardenCart, IconHeart, IconLogin, IconLogout, IconUserPlus } from '@tabler/icons-vue';
import { computed, onMounted, ref, shallowRef } from 'vue';

import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import sidebarItem from './SidebarItems';
import { useRouter } from 'vue-router';

const sidebarMenu = shallowRef(sidebarItem);

const drawer = ref(false);

onMounted(async () => {});

const router = useRouter();
const logout = async () => {};
</script>

<style lang="scss" scoped>
.top {
    font-size: 12px;
}
.header {
    background: white;
    padding: relative;
    .header-nav {
        @media (max-width: 1070px) {
            font-size: 14px !important;
        }
        @media (max-width: 970px) {
            font-size: 10px !important;
        }
    }
    .navigation {
        font-size: 17px;
    }
    .second-header {
        z-index: 10;
        position: absolute;
        height: 85px;
        border-bottom-right-radius: 25px;
        border-bottom-left-radius: 25px;
        img {
            right: 10%;
        }
    }
    .btn-icon {
        @media (max-width: 500px) {
            display: none;
        }
    }
    .logo-img {
        @media (max-width: 500px) {
            width: 60px;
            height: 60px;
        }
    }
}
</style>
