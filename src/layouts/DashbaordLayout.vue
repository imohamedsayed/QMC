<script setup>
import { RouterView } from 'vue-router';
import MainView from '@/components/admin/layout/full/Main.vue';
</script>

<template>
    <v-locale-provider>
        <v-app class="dashboard-main">
            <MainView />
            <v-main :dir="$i18n.locale === 'AR' ? 'ltr' : 'ltr'">
                <v-container class="page-wrapper">
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
<style>
.dashboard-main {
    background-color: #ffffff;
}
</style>
