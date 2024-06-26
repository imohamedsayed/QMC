<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Related Products">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddBundle' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new bundle</v-btn
                    >
                </div>
                <RelatedProductsList :PCModel="id" />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import RelatedProductsList from '@/components/admin/pc model/RelatedProductsList.vue';
export default {
    components: { UiParentCard, RelatedProductsList },
    props: ['id'],
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
