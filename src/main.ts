import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Maska from 'maska';
import { createI18n } from 'vue-i18n';
import 'vue3-toastify/dist/index.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import 'animate.css';

import EN from './locale/EN';
import AR from './locale/AR';

const i18n = createI18n({
    legacy: false,
    locale: localStorage.lang || 'EN',
    globalInjections: true,
    messages: {
        EN: EN,
        AR: AR
    }
});

document.documentElement.lang = localStorage.lang || 'EN';

router.beforeEach((to, from, next) => {
    const baseTitle = 'QMC ';
    const routeTitle = to.meta.title;

    if (routeTitle) {
        document.title = `${baseTitle} | ${routeTitle}`;
    } else {
        document.title = baseTitle;
    }

    next();
});
router.beforeEach((to, from, next) => {
    if (
        to.name !== 'login' &&
        to.name !== 'Register' &&
        to.name !== 'ResetPassword' &&
        to.name !== 'AdminForgetPassword' &&
        to.name !== 'adminLogin' &&
        to.name !== 'VerifyEmail' &&
        to.name !== 'AdminResetPassword'
    ) {
        localStorage.setItem('lastRoute', to.fullPath);
    }
    next();
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.component('EasyDataTable', Vue3EasyDataTable);
app.use(router);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(Maska);
app.use(VueApexCharts);
app.use(i18n);
app.use(pinia);

import './axios';
app.use(vuetify).mount('#app');
