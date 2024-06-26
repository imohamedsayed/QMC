<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Orders">
                <OrdersListVue />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import OrdersListVue from '@/components/admin/orders/OrdersList.vue';
export default {
    components: { UiParentCard, OrdersListVue },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
