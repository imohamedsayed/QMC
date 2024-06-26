<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Messages">
                <MessagesList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from 'axios';
import MessagesList from '@/components/admin/messages/MessagesList.vue';
export default {
    components: { UiParentCard, MessagesList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>

