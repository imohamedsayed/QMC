<template>
    <div class="tickets py-16">
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

            <div v-if="loading">
                <div class="skelton text-center pt-10" v-for="i in 3" :key="i">
                    <v-progress-circular color="primary" width="3" size="120" indeterminate></v-progress-circular>
                </div>
            </div>
            <div v-else-if="!loading && tickets.length">
                <v-card
                    v-for="ticket in tickets"
                    :key="ticket.id"
                    color="primary"
                    :variant="ticket.isReplied == 'replied' ? 'flat' : 'tonal'"
                    class="my-10 pa-8 ticket-message"
                    @click="$router.push({ name: 'TicketChat', params: { id: ticket.id } })"
                >
                    <v-card-title>{{ ticket.message }}</v-card-title>
                    <v-card-subtitle>{{ ticket.sendAt }}</v-card-subtitle>
                    <v-badge color="success" v-if="ticket.isReplied == 'replied'" class="mt-5"
                        ><v-chip>Admin Replied To your message</v-chip></v-badge
                    >
                    <v-chip color="muted" v-else class="mt-5">Admin will reply to your message soon</v-chip>
                </v-card>
            </div>
            <div class="text-center not-found" v-else>
                <img class="mx-auto" width="500" src="../../assets/images/background/noMessages.svg" />
                <p class="font-weight-bold" style="font-size: 1.2rem; text-align: center">{{ $t('messages.noMessages') }}</p>
            </div>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import type { Ticket } from '@/types/website/MessageType';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const authStore = useAuthStore();
const user = computed(() => authStore.getUser);
const loading = ref<boolean>(true);
const { t } = useI18n({ useScope: 'global' });
const items = [
    {
        title: t('bread.messages'),
        disabled: true,
        href: '/support-message'
    }
];

const tickets = ref<Ticket[]>([]);

onMounted(async () => {
    if (!user.value) useRouter().push('/login');
    else {
        try {
            const res: any = await axios.get('api/messages');
            if (res.status == 200) {
                tickets.value = res.data.messages;
                setTimeout(() => {
                    animateTickets();
                }, 100);
            } else {
                throw new Error(res.response?.data?.message || 'Something went wrong, try again later');
            }
        } catch (error: any) {
            toast.error(error.message);
        }
        loading.value = false;
    }
});
const router = useRouter();

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
const animateTickets = () => {
    gsap.utils.toArray('.ticket-message').forEach((box: any) => {
        gsap.from(box, {
            x: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play reverse restart reverse'
            }
        });
    });
};
</script>

<style lang="scss" scoped>
.skelton {
    height: 200px;
    background: rgba(128, 128, 128, 0.104);
    margin-bottom: 20px;
    border-radius: 30px;
}
.ticket-message {
    transition: all 0.3s ease-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.02);
    }
}
.not-found {
    text-align: center !important;
    img {
        @media (max-width: 500px) {
            width: auto !important;
        }
    }
}
</style>
