<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Why Us">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddWhyUs' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new Why us box</v-btn
                    >
                </div>
                <WhyUsList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import WhyUsList from '@/components/admin/whyUs/WhyUsList.vue';
export default {
    components: { UiParentCard, WhyUsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
