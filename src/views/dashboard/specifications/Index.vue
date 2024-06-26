<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Specifications">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddSpecification' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new specification</v-btn
                    >
                </div>
                <SpecificationsList />
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
import SpecificationsList from '@/components/admin/specifications/SpecificationsList.vue';
export default {
    components: { UiParentCard, SpecificationsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
