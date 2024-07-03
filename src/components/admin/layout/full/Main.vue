<template>
    <!------Sidebar-------->
    <v-navigation-drawer
        left
        elevation="0"
        app
        class="leftSidebar"
        v-model="sDrawer"
        :location="$i18n.locale === 'AR' ? 'left' : 'left'"
        :dir="$i18n.locale === 'AR' ? 'ltr' : 'ltr'"
    >
        <!---Logo part -->
        <div class="d-flex justify-center py-4 text-center cursor-pointer pa-5" @click="$router.push('/')">
            <img src="@/assets/images/logo.png" width="80" height="60" />
        </div>

        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <div>
            <perfect-scrollbar class="scrollnavbar">
                <v-list class="pa-6">
                    <!---Menu Loop -->
                    <template v-for="item in sidebarMenu">
                        <!---Item Sub Header -->
                        <NavGroup :item="item" v-if="item.header" :key="item.title" />

                        <!---Single Item-->
                        <NavItem :item="item" v-else class="leftPadding" />
                        <!---End Single Item-->
                    </template>
                </v-list>
                <div class="pa-4">
                    <ExtraBox />
                </div>
            </perfect-scrollbar>
        </div>
    </v-navigation-drawer>
    <!------Header-------->
    <v-app-bar elevation="0" height="70">
        <div class="d-flex align-center justify-space-between w-100">
            <div>
                <v-btn
                    class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
                    @click="sDrawer = !sDrawer"
                    icon
                    variant="flat"
                    size="small"
                >
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <!-- Notification -->
                <NotificationDD />
            </div>
            <div>
                <!-- <Language /> -->
                <!-- Gear button -->
                <!-- <Apps /> -->
                <!-- User Profile -->
                <ProfileDD />
            </div>
        </div>
    </v-app-bar>
</template>
<script setup>
import { ref, shallowRef } from 'vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import ExtraBox from './vertical-sidebar/extrabox/ExtraBox.vue';
import Logo from './logo/Logo.vue';
// Icon Imports
import { Menu2Icon, BellRingingIcon } from 'vue-tabler-icons';
// dropdown imports
import NotificationDD from './vertical-header/NotificationDD.vue';
import ProfileDD from './vertical-header/ProfileDD.vue';
import Apps from './vertical-header/Apps.vue';
import Language from './vertical-header/Language.vue';
const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);
</script>
