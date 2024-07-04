<template>
    <div class="about-us py-10">
        <v-container>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-btn icon elevation="0" class="bg-background" to="/">
                        <v-icon class="mx-1" size="small" icon="mdi-home" color="skin"></v-icon>
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
            <div >
                <WhyUs />
                <About />
            </div>
            
        </v-container>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import WhyUs from '@/components/website/about/WhyUs.vue';
import About from '@/components/website/about/About.vue';
const { t } = useI18n({ useScope: 'global' });
import { IconUsersGroup } from '@tabler/icons-vue';

const items = [
    {
        title: t('bread.about'),
        disabled: true,
        href: 'about'
    }
];

onMounted(() => {
    // animations
    window.scrollTo(0, 0);
});
</script>

<style lang="scss" scoped>
.about-us {
    overflow-x: hidden;
    overflow-y: hidden;
}
.skelton {
    background: linear-gradient(to bottom right, rgba(187, 179, 179, 0.321), rgba(255, 254, 254, 0.096));
    border-radius: 10px;
    width: 100%;
    animation: shimmer 2s infinite;
    background-size: 200% 100%;
    &.header {
        height: 20px;
        width: 400px;
        margin: 0 auto;
        margin-bottom: 16px;
    }
    &.p {
        height: 20px;
        margin-bottom: 8px;
    }
    &.card {
        margin-top: 10px;
        height: 200px;
    }
    &.rectangle {
        margin-top: 10px;
        height: 200px;
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
