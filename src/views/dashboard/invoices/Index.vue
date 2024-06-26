<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Invoices">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddTaxInvoices' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new Invoice</v-btn
                    >
                </div>
                <InvoicesList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import InvoicesList from '@/components/admin/Invoices/InvoicesList.vue';
export default {
    components: { UiParentCard, InvoicesList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
