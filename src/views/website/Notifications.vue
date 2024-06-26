<template>
    <div class="notifications py-16">
        <v-container>
            <v-breadcrumbs :items="items" class="mb-10">
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
            <div v-if="loading" class="px-16">
                <v-progress-linear class="mb-4" color="primary" indeterminate></v-progress-linear>

                <div class="skelton" v-for="i in 6" :key="i"></div>
            </div>
            <div v-else-if="!loading && notifications.length">
                <v-list density="default" lines="two" class="px-10 bg-background" style="overflow-x: hidden">
                    <div v-for="n in notifications" :key="n.id">
                        <v-list-item
                            v-if="n.data.message"
                            :class="['mb-3', n.read_at == null ? 'bg-primary' : '', 'pa-6', 'notification']"
                            :title="$t('notification.newMessage')"
                            color="primary"
                            :to="'/support-messages/' + n.data.message.id"
                        >
                            <v-list-item-subtitle>
                                <span>{{ n.data.message.replies[n.data.message.replies.length - 1].reply + '...' }}</span
                                ><br />
                                <span class="mt-2 d-inline-block">{{
                                    n.data.message.replies[n.data.message.replies.length - 1].replyAt
                                }}</span
                                ><br />
                            </v-list-item-subtitle>

                            <template #prepend>
                                <!-- image="/assets/images/users/1.jpg" -->
                                <v-avatar size="40" icon="mdi-bell-outline" color="primary" />
                            </template>
                        </v-list-item>
                        <v-list-item
                            v-if="n.data.order"
                            :class="['mb-3', n.read_at == null ? 'bg-primary' : '', 'pa-6', 'notification']"
                            :title="$t('notification.orderUpdate')"
                            color="primary"
                            :to="'/profile/orders/' + n.data.order.orderId"
                        >
                            <v-list-item-subtitle>
                                <span>{{ $t('notification.orderNow') }}{{ n.data.order.Status }}</span
                                ><br />
                                <span class="mt-2 d-inline-block">{{ n.created_at }}</span
                                ><br />
                            </v-list-item-subtitle>

                            <template #prepend>
                                <!-- image="/assets/images/users/1.jpg" -->
                                <v-avatar size="40" icon="mdi-bell-outline" color="primary" />
                            </template>
                        </v-list-item>
                    </div>
                </v-list>
                <div class="px-10">
                    <v-btn elevation="0" color="primary" variant="outlined" block rounded="lg" :loading="markLoading" @click="markRead">
                        {{ $t('notification.markAsRead') }}
                    </v-btn>
                </div>
            </div>
            <div v-else class="text-center no-notifications">
                <v-icon size="200" class="mb-2" color="warning" style="text-align: center">mdi-bell-off-outline</v-icon>
                <p class="text-error font-weight-bold" style="font-size: 1.2rem; text-align: center" v-if="err">{{ err }}</p>
                <p class="text-muted font-weight-bold" style="font-size: 1.2rem; text-align: center" v-else>
                    {{ $t('notification.noNotifications') }}
                </p>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
const { t } = useI18n({ useScope: 'global' });

const items = [
    {
        title: t('bread.notifications'),
        disabled: true,
        href: '/notifications'
    }
];

gsap.registerPlugin(ScrollTrigger);
const loading = ref(false);
const markLoading = ref(false);
const err = ref('');
const user = computed(() => useAuthStore().getUser);

const notifications = ref([]);
const router = useRouter();
onMounted(async () => {
    if (!user.value) router.push('/login');
    else {
        await loadNotifications();
    }
});

watch(
    user,
    (value) => {
        checkAuth();
    },
    { deep: true }
);

const checkAuth = () => {
    if (!user.value) {
        router.push('/login');
    }
};
const markRead = async () => {
    markLoading.value = true;
    try {
        const res = await axios.get('api/notifications-mark');
        if (res.status == 200) {
            await loadNotifications();
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        err.value = error.message;
        toast.error(error.message);
    }
    markLoading.value = false;
};

const loadNotifications = async () => {
    loading.value = true;
    try {
        const res = await axios.get('api/notifications');
        if (res.status == 200) {
            notifications.value = res.data.notifications;
            setTimeout(() => {
                animateNotifications();
            }, 100);
        } else {
            throw new Error(res.response?.data?.message || 'Something went wrong, try again later');
        }
    } catch (error) {
        err.value = error.message;
        toast.error(error.message);
    }
    loading.value = false;
};
const animateNotifications = () => {
    gsap.utils.toArray('.notification').forEach((box) => {
        gsap.from(box, {
            x: 100,
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
};
</script>

<style lang="scss" scoped>
.skelton {
    height: 100px;
    background: rgba(128, 128, 128, 0.104);
    margin-bottom: 20px;
    border-radius: 30px;
}
.no-notifications {
    text-align: center !important;
}
</style>
