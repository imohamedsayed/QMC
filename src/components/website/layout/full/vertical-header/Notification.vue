<template>
    <div class="d-inline" v-if="user">
        <v-menu width="360">
            <template #activator="{ props }">
                <v-btn class="custom-hover-primary ml-0 mr-3 text-muted" variant="text" v-bind="props" icon @click="loadNotifications">
                    <v-badge dot color="primary" offset-x="-5" offset-y="-3">
                        <BellRingingIcon stroke-width="1.5" size="22" />
                    </v-badge>
                </v-btn>
            </template>

            <v-sheet rounded="md" elevation="10" class="pa-3">
                <v-list density="default" lines="two" v-if="loading">
                    <v-list-item v-for="n in 3" :key="n" class="notification-skelton"> </v-list-item>
                    <v-progress-linear color="primary" indeterminate></v-progress-linear>
                </v-list>
                <v-list density="default" lines="two" v-else-if="!loading && notifications.length">
                    <div class="notifications-body">
                        <div v-for="n in notifications" :key="n.id">
                            <v-list-item
                                v-if="n.data.message"
                                :title="$t('notification.newMessage')"
                                color="primary"
                                :to="'/support-messages/' + n.data.message.id"
                            >
                                <v-list-item-subtitle>
                                    <span>{{
                                        n.data.message.replies[n.data.message.replies.length - 1].reply.substring(0, 30) + '...'
                                    }}</span
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
                                :title="$t('notification.orderUpdate')"
                                color="primary"
                                :to="'/profile/orders/' + n.data.order.orderId"
                            >
                                <v-list-item-subtitle>
                                    <span :dir="$i18n.locale === 'EN' ? 'ltr' : 'rtl'"
                                        >{{ $t('notification.orderNow') }}{{ n.data.order.Status }}</span
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
                    </div>
                </v-list>
                <v-list density="default" lines="two" v-else>
                    <div class="text-center">
                        <v-icon size="50" class="mb-2">mdi-bell-off-outline</v-icon>
                        <p class="text-error" v-if="err">{{ err }}</p>
                        <p class="text-muted" v-else>
                            {{ $t('notification.noNotifications') }}
                        </p>
                    </div>
                </v-list>
                <div class="px-4">
                    <v-btn elevation="0" color="primary" variant="outlined" block rounded="lg" to="/notifications">
                        {{ $t('notification.showAll') }}
                    </v-btn>
                </div>
            </v-sheet>
        </v-menu>
    </div>
</template>

<script setup>
import { BellRingingIcon } from 'vue-tabler-icons';
import { computed, ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import axios from 'axios';

const authStore = useAuthStore();

const user = computed(() => authStore.getUser);

const err = ref('');

const loading = ref(false);

const notifications = ref([]);

const loadNotifications = async () => {
    loading.value = true;
    try {
        const res = await axios.get('api/notifications-unread');
        if (res.status == 200) {
            notifications.value = res.data.notifications;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        err.value = error.message;
    }

    loading.value = false;
};
</script>

<style lang="scss" scoped>
.notifications-body {
    max-height: 300px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 3px;
    }
    &::-webkit-scrollbar-thumb {
        background: #5d88ff82;
        border-radius: 20px;
        transition: all 0.3s ease;
        &:hover {
            background: #5d87ff;
        }
    }
}
.notification-skelton {
    height: 80px;
    background: rgba(128, 128, 128, 0.104);
    margin-bottom: 10px;
    border-radius: 10px;
}
</style>
