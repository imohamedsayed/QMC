<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Chat">
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
                                <p>{{ userMessage.user.fullName }}</p>
                                <div class="body-message">
                                    {{ userMessage.message }}
                                </div>
                                <div class="date-skelton text-muted">{{ userMessage.sendAt }}</div>
                            </div>

                            <Reply v-for="message in supportReplies" :key="message.id" :message="message" />
                        </div>
                        <div v-else>
                            <div class="approved text-center mt-16">
                                <v-icon size="200" color="error">mdi-message-alert-outline</v-icon>
                                <p class="font-weight-bold text-error" style="font-size: 1.2rem" v-if="err">{{ err }}</p>
                                <p class="font-weight-bold text-error" style="font-size: 1.2rem" v-else>
                                    {{ $t('messages.noMessages') }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <form @submit.prevent="sendReply">
                        <div class="send-message mt-10 d-flex align-center gap-3">
                            <v-text-field
                                v-model="reply"
                                required
                                class="w-75 rounded-bill"
                                variant="outlined"
                                label="write a message"
                                color="primary"
                            >
                            </v-text-field>
                            <v-btn type="submit" color="primary" class="mb-6" size="x-large" :loading="replyLoading"
                                ><v-icon class="mx-3">mdi-send-circle-outline</v-icon> Send
                            </v-btn>
                        </div>
                    </form>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted, ref, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from 'axios';
import Reply from '@/components/admin/messages/Reply.vue';
import type { Reply as ReplyType, UserMessage } from '@/types/dashboard/MessageType';

const loading = ref<boolean>(true);
const userMessage = ref<UserMessage | null>(null);
const supportReplies = ref<ReplyType[]>([]);
const err = ref<string>('');
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const admin = computed(() => useAuthStore().getAdmin);
const reply = ref<string>('');
const replyLoading = ref<boolean>(false);
onMounted(async () => {
    if (!admin.value) useRouter().push({ name: 'adminLogin' });
    else {
        await loadChat();
    }
});
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
        const res: any = await axios.get('api_dashboard/messages/' + props.id);
        if (res.status == 200) {
            userMessage.value = res.data.message;
            supportReplies.value = res.data.message?.replies;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error: any) {
        err.value = error.message;
        toast.error(error.message);
    }
    loading.value = false;
};

const sendReply = async () => {
    replyLoading.value = false;
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace('T', ' ').substring(0, 16);
        const replyObject = {
            id: 20,
            reply: reply.value,
            replyAt: formattedDate,
            addedRecently: true
        };

        const res: any = await axios.post('api_dashboard/messages-reply', {
            message_id: props.id,
            reply: reply.value
        });

        if (res.status == 201) {
            supportReplies.value.push(replyObject);
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error: any) {
        toast.error(error.message);
    }
    replyLoading.value = false;
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
            direction: ltr;
            .body-skelton {
                border-bottom-left-radius: 40px;
            }
        }
        &.admin {
            direction: rtl;
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
            direction: ltr;
            .body-message {
                border-bottom-right-radius: 40px;
                background: #5d87ff;
                color: white;
            }
        }
        &.admin {
            direction: rtl;
            .body-message {
                border-bottom-left-radius: 40px;
            }
        }
        margin: 20px 0;

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
}
</style>
