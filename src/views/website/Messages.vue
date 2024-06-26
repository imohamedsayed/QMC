<template>
    <div class="messages py-16">
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
            <div class="chat">
                <div class="chat-body">
                    <div v-if="loading">
                        <div class="message-skelton user">
                            <div class="body-skelton"></div>
                            <div class="date-skelton"></div>
                        </div>
                        <div class="message-skelton admin">
                            <div class="body-skelton"></div>
                            <div class="date-skelton"></div>
                        </div>
                        <div class="message-skelton admin">
                            <div class="body-skelton"></div>
                            <div class="date-skelton"></div>
                        </div>
                    </div>
                    <div v-if="!loading && userMessage">
                        <div class="message user">
                            <div class="body-message">
                                <p :dir="$i18n.locale === 'EN' ? 'ltr' : 'rtl'">{{ userMessage.message }}</p>
                            </div>
                            <div class="date-skelton">
                                <span dir="ltr" class="text-muted">
                                    {{ userMessage.sendAt }}
                                </span>
                            </div>
                        </div>
                        <div class="message admin" v-for="message in supportReplies" :key="message.id">
                            <div class="body-message">
                                {{ message.reply }}
                            </div>
                            <div class="date-skelton">
                                <span dir="ltr" class="text-muted">
                                    {{ message.replyAt }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="approved text-center mt-16">
                            <v-icon size="200" color="error" style="text-align: center">mdi-message-alert-outline</v-icon>
                            <p class="font-weight-bold text-error" style="font-size: 1.2rem; text-align: center" v-if="err">{{ err }}</p>
                            <p class="font-weight-bold text-error" style="font-size: 1.2rem; text-align: center" v-else>
                                {{ $t('messages.noMessages') }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="send-message mt-10 d-flex align-center gap-3" v-if="false">
                    <v-text-field class="w-75 rounded-bill" variant="outlined" label="write a message" color="primary"> </v-text-field>
                    <v-btn color="primary" class="mb-6" size="x-large"><v-icon class="mx-3">mdi-send-circle-outline</v-icon> Send </v-btn>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import axios from 'axios';

import type { Reply, UserMessage } from '@/types/website/MessageType';

const authStore = useAuthStore();

const user = computed(() => authStore.getUser);

const loading = ref<boolean>(true);
const { t } = useI18n({ useScope: 'global' });

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const items = [
    {
        title: t('bread.messages'),
        disabled: true,
        href: '/support-message'
    }
];
const err = ref<string>('');
const userMessage = ref<UserMessage | null>(null);
const supportReplies = ref<Reply[]>([]);
onMounted(async () => {
    window.scrollTo(0, 0);

    if (!user.value) {
        useRouter().push('/login');
    } else {
        await loadChat();
    }
});

const checkAuth = () => {
    if (!user.value) {
        useRouter().push('/login');
    }
};
watch(
    user,
    (value) => {
        checkAuth();
    },
    { deep: true }
);
watch(
    props,
    (value) => {
        loadChat();
    },
    { deep: true }
);
const loadChat = async () => {
    loading.value = true;
    try {
        const res: any = await axios.get('api/messages/' + props.id);
        if (res.status == 200) {
            userMessage.value = res.data.message;
            supportReplies.value = res.data.message.replies;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error: any) {
        err.value = error.message;
        toast.error(error.message);
    }
    loading.value = false;
};
</script>

<style lang="scss" scoped>
.chat {
    .chat-body {
        border: 1px solid #33333319;
        height: 70vh;
        overflow-y: auto;
        padding: 0 40px;
        &::-webkit-scrollbar {
            width: 8px;
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
    .message-skelton {
        &.user {
            direction: rtl;
            .body-skelton {
                border-bottom-left-radius: 40px;
            }
        }
        &.admin {
            direction: ltr;
            .body-skelton {
                border-bottom-right-radius: 40px;
            }
        }
        margin: 20px 0;
        .body-skelton {
            height: 200px;
            width: 600px;
            background: rgba(128, 128, 128, 0.104);
            margin-bottom: 20px;
            border-radius: 10px;
        }
        .date-skelton {
            width: 300px;
            height: 20px;
            background: rgba(128, 128, 128, 0.104);
            border-radius: 10px;
            margin-top: 10px;
        }
    }
    .message {
        &.user {
            direction: rtl;
            .body-message {
                border-bottom-left-radius: 40px;
                background: #5d87ff;
                color: white;
            }
        }
        &.admin {
            direction: ltr;
            .body-message {
                border-bottom-right-radius: 40px;
            }
        }
        margin: 30px 0;

        .body-message {
            min-height: 100px;
            width: fit-content;
            background: rgba(128, 128, 128, 0.104);
            margin-bottom: 20px;
            border-radius: 10px;
            padding: 20px 40px;
            font-size: 1.2rem;
            @media (max-width: 720px) {
                font-size: 1rem;
            }
        }
    }
    padding: 10px 20px;
    .approved {
        text-align: center !important;
    }
}
</style>
