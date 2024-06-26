<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Brands">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddBrand' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new brand</v-btn
                    >
                </div>
                <BrandsList />
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
import BrandsList from '@/components/admin/brands/BrandsList.vue';
export default {
    components: { UiParentCard, BrandsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
