<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Sub Categories">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddCategory' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new category</v-btn
                    >
                </div>
                <SubCategoriesList :parent="id" />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import SubCategoriesList from '@/components/admin/categories/SubCategoriesList.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
export default {
    components: { UiParentCard, SubCategoriesList },
    props: ['id'],
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
