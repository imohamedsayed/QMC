<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="FAQs">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddFAQ' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new FAQ</v-btn
                    >
                </div>
                <FAQsList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import FAQsList from '@/components/admin/FAQ/FAQsList.vue';
export default {
    components: { UiParentCard, FAQsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
