<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Products">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddProduct' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new product</v-btn
                    >
                </div>
                <ProductsList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import ProductsList from '@/components/admin/products/ProductsList.vue';
export default {
    components: { UiParentCard, ProductsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
