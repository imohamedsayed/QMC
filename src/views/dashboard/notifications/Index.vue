<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Notifications">
                <div v-if="loading" class="px-16">
                    <v-progress-linear class="mb-4" color="primary" indeterminate></v-progress-linear>

                    <div class="skelton" v-for="i in 6" :key="i"></div>
                </div>
                <div v-else-if="!loading && notifications.length" class="pa-4">
                    <v-list density="default" lines="two" class="px-10 bg-white" style="overflow-x: hidden">
                        <div v-for="n in notifications" :key="n.id">
                            <v-list-item
                                v-if="n.data.message"
                                :class="['mb-3', n.read_at == null ? 'bg-primary' : '', 'pa-6', 'notification']"
                                :title="'New Message Received'"
                                color="primary"
                                :to="'/dashboard/tickets/' + n.data.message.id"
                            >
                                <v-list-item-subtitle>
                                    <span>{{ n.data.message.message }}</span
                                    ><br />
                                    <span class="mt-2 d-inline-block">{{ n.data.message.sendAt }}</span
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
                <div v-else class="text-center pa-8">
                    <v-icon size="200" class="mb-2" color="warning">mdi-bell-off-outline</v-icon>
                    <p class="text-error font-weight-bold" style="font-size: 1.2rem" v-if="err">{{ err }}</p>
                    <p class="text-muted font-weight-bold" style="font-size: 1.2rem" v-else>You have no notifications available</p>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script setup>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted, ref, computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from 'axios';

const admin = computed(() => useAuthStore().getAdmin);
const loading = ref(false);
const markLoading = ref(false);
const notifications = ref([]);
const err = ref('');
onMounted(async () => {
    if (!admin.value) useRouter().push({ name: 'adminLogin' });
    else {
        await loadNotifications();
    }
});
const markRead = async () => {
    markLoading.value = true;
    try {
        const res = await axios.get('api_dashboard/notifications-mark');
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
        const res = await axios.get('api_dashboard/notifications');
        if (res.status == 200) {
            notifications.value = res.data.notifications;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        err.value = error.message;
        toast.error(error.message);
    }
    loading.value = false;
};
</script>
<style lang="scss" scoped>
.skelton {
    height: 100px;
    background: rgba(128, 128, 128, 0.104);
    margin-bottom: 20px;
    border-radius: 10px;
}
</style>
