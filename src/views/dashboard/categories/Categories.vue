<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Categories">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddCategory' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new category</v-btn
                    >
                </div>
                <CategoriesList :categories="state.categories" :dataLoading="state.loading" />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import CategoriesList from '@/components/admin/categories/CategoriesList.vue';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from 'axios';
export default {
    components: { UiParentCard, CategoriesList },
    setup() {
        const state = reactive({
            categories: [],
            loading: false
        });
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
            state.loading = true;
            try {
                const res = await axios.get('api_dashboard/parentCategories');
                if (res.status == 200) {

                    state.categories = res.data.data;
                } else {
                    throw new Error(res.response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
            state.loading = false;
        });

        return { state };
    }
};
</script>
