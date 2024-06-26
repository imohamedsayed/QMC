<template>
    <div class="build-your-bundle py-10">
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

            <v-window v-model="step">
                <v-window-item :value="0">
                    <v-row class="my-15 justify-center">
                        <v-col cols="12" md="4">
                            <div
                                :class="[$i18n.locale === 'AR' ? 'right' : 'left', 'cursor-pointer']"
                                @click="$router.push({ name: 'BundleBrands', params: { type: 1 } })"
                            >
                                <div class="workstation">
                                    <v-img src="./images/pc.jpeg" width="cover" height="100%"></v-img>
                                </div>
                                <p class="text-center font-weight-bold mt-md-5">{{ $t('bundle.pc') }}</p>
                            </div>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div
                                :class="[$i18n.locale === 'AR' ? 'left' : 'right', 'cursor-pointer']"
                                @click="$router.push({ name: 'BundleBrands', params: { type: 2 } })"
                            >
                                <div class="pc">
                                    <v-img src="./images/workstation.jpeg" width="cover" height="100%"></v-img>
                                </div>
                                <p class="text-center font-weight-bold mt-md-5">{{ $t('bundle.workstation') }}</p>
                            </div>
                        </v-col>
                    </v-row>
                </v-window-item>
            </v-window>
        </v-container>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

gsap.registerPlugin(ScrollTrigger);
const { t } = useI18n({ useScope: 'global' });
const items = [
    {
        title: t('bread.buildYOB'),
        disabled: true,
        href: 'BuildYourBundle'
    }
];

const step = ref(0);

onMounted(() => {
    // animations

    gsap.from('.right', {
        x: 1000,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.right',
            start: 'top 80%'
        }
    });
    gsap.from('.left', {
        x: -1000,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.left',
            start: 'top 80%'
        }
    });
});
</script>

<style lang="scss" scoped>
.build-your-bundle {
    p {
        text-align: center !important;
    }
    .left,
    .right {
        > div {
            height: 400px;
        }
        p {
            font-size: 1.4rem;
        }
    }

    .left {
        position: relative;
        &::before {
            content: '';
            width: 1200px;
            height: 24px;
            background: var(--skin-color);
            position: absolute;
            top: 50%;
            left: -1000px;
            transform: translateY(-50%);
        }
    }
    .right {
        position: relative;
        &::before {
            content: '';
            width: 1200px;
            height: 24px;
            background: var(--skin-color);
            position: absolute;
            top: 50%;
            right: -1000px;
            transform: translateY(-50%);
        }
    }
}
</style>
