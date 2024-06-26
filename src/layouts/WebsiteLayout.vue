<script setup>
import { RouterView } from 'vue-router';
import Headers from '@/components/website/layout/full/Headers.vue';
import Footer from '@/components/website/layout/full/footer/Footer.vue';
</script>

<template>
    <v-locale-provider>
        <v-app class="website-main p-0 m-0">
            <Headers />
            <main :dir="$i18n.locale === 'AR' ? 'rtl' : 'ltr'" class="p-0 m-0">
                <RouterView v-slot="{ Component, route }">
                    <transition :enter-active-class="route.meta.enterCLass" :leave-active-class="route.meta.leaveClass" mode="out-in">
                        <component :is="Component"></component>
                    </transition>
                </RouterView>
            </main>
            <Footer />
        </v-app>
    </v-locale-provider>
</template>
<style scoped>
.website-main {
    background-color: #eff3fd;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-out;
}
</style>
