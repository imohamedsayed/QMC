<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Blogs">
                <div class="text-end mr-10">
                    <v-btn color="primary" @click="$router.push({ name: 'AddBlog' })"
                        ><v-icon class="mr-2">mdi-plus</v-icon> Add new blog</v-btn
                    >
                </div>
                <BlogsList />
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import BlogsList from '@/components/admin/blogs/BlogsList.vue';
export default {
    components: { UiParentCard, BlogsList },
    setup() {
        const admin = useAuthStore().getAdmin;
        onMounted(async () => {
            if (!admin) useRouter().push({ name: 'adminLogin' });
        });
    }
};
</script>
