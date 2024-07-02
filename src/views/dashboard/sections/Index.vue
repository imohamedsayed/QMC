<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Services">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddChildService' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new Service</v-btn
                    >
                </div>
                <ChildServicesList />
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
import ChildServicesList from '@/components/admin/services/ChildServicesList.vue';
export default {
    components: { UiParentCard, ChildServicesList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
